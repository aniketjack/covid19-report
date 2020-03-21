import { Component, OnInit, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-stack-bar-graph',
  templateUrl: './stack-bar-graph.component.html',
  styleUrls: ['./stack-bar-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StackBarGraphComponent implements OnInit {
  @Input() data;

  constructor(
  ) { }


  ngOnInit() {
    if (this.data['data']) {
      //this.processedData = this.processDataService.processBarChartData(this.data);
      this.drawStackBarChart(this.data['data']);
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    this.data = changes.data.currentValue;
    if (this.data) {
      this.drawStackBarChart(this.data['data']);
    }
  }



  drawStackBarChart(data: any) {
    d3.select("#bar-stack-chart").selectAll("*").remove();
    let thisRef = this;
    let xData = ["confirmed", "deaths", "recovered"];
    let width = 400,
        height = 300;
    let x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .35);
    let y = d3.scale.linear()
      .rangeRound([height, 0]);
    // parse time
    let parse = d3.time.format("%B %d").parse;
    /* let yRight = d3.scale.linear()
      .rangeRound([0, height]); */  
    let color = d3.scale.ordinal()
      .range(["#ef9d36", "#ff1e1e","#007500"]);
    let xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(d3.time.days,1);
    let yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10)
      .tickSize(-width, 0, 0)
      .tickFormat(function (d) { return d });
    /* let yAxisRight = d3.svg.axis()
      .scale(yRight)
      .orient("right")
      .ticks(10)
      .tickSize(-width, 0, 0)
      .tickFormat(function (d) { return d });   */
    let svg = d3.select("#bar-stack-chart")
      .classed('svg-container', true)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '-50 -80 500 450')
      .classed('svg-content-responsive', true)
      .append("g");
    let dataIntermediate = xData.map(function (entity) {
      return data.map(function (d) {
        return { x: d.date, y: d[entity], category: entity };
      });
    });
    let dataStackLayout = d3.layout.stack()(dataIntermediate);
    console.log("Stack returned data structure >>>> ", dataStackLayout);
    x.domain(dataStackLayout[0].map(function (d) {
        //console.log("Date parse >> ", pd.x));
      return d.x;
    }));
    y.domain([0,
      d3.max(dataStackLayout[dataStackLayout.length - 1],
        function (d) { return d.y0 + d.y; })
    ])
      .nice();
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(54)")
      .style("text-anchor", "start");
    svg.append("g")
      .style("font-size", "10px")
      .style("font-weight", "500")
      .attr("class", "y axis")
      .call(yAxis);  
    /* svg.append("g")
      .style("font-size", "12px")
      .style("font-weight", "500")
      .attr("class", "y axis axis-right")
      .attr("transform", "translate(" + width + " ,0)")
      .call(yAxisRight);  */ 
    let layer = svg.selectAll(".stack")
      .data(dataStackLayout)
      .enter().append("g")
      .attr("class", "stack")
      .style("fill", function (d, i) {
        return color(i);
      });
    let rectEnter = layer.selectAll("rect")
      .data(function (d) {
        return d;
      })
      .enter().append("rect")
      .attr("x", function (d) {
        return x(d.x);
      })
      .attr("y", function (d) {
        return y(0);
      })
      .attr("height", function (d) {
        return 0;
      })
      .attr("width", x.rangeBand());
    svg.selectAll("rect")
      .transition()
      .duration(1500)
      .attr("y", function (d) {
        return y(d.y + d.y0);
      })
      .attr("height", function (d) {
        return y(d.y0) - y(d.y + d.y0);
      });
    layer.selectAll("text")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("text")
      .attr("x", function (d) {
        return x(d.x);
      })
      .attr("y", function (d) { return y(d.y0); })
      .attr("dy", "-0.5em")
      .attr("dx", "0.5em")
      .style("font-size", "6px")
      .style("fill", "#fff")
      .style("text-anchor", "start")
      .text(function (d) { return d.y; });
    
    function wrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }
  }
}