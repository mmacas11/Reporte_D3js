d3.json("https://raw.githubusercontent.com/mikmawi/inec_ecuador_nacidos/main/datos_de_los_nacidos.json").then
(function(datos) {         
    var height = 700
    var width = 1900
          var margin = {
            top : 60,
            botton : 35,
            left : 75,
            right :50
        }
    
    var escalaX = d3.scaleLinear()
    .domain(d3.extent(datos, function(d) { return d.AÑO; }))
    .range(["75", "750"])

    var escalaY = d3.scaleLinear()
    .domain(d3.extent(datos,d=>d.Nacidos))
    .range(["650", "400"])

    var elementoSVG = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    elementoSVG
    .append("path")
    .datum(datos)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width",2)
    .attr("d", d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return escalaX(d.AÑO) })
        .y(function(d) { return escalaY(d.Nacidos) })
        )

    var Tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "whithe")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    var mouseover = function(d) { 
        Tooltip
        .style("opacity", 1)
        }

    var mousemove = function(d) { 
        Tooltip
        .html("Cantidad de nacidos en Ecuador: " + d.Nacidos)
        .style("left", (d3.mouse(this)[0]+70) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
        }

    var mouseleave = function(d) {
        Tooltip
        .style("opacity", 0)
         }

    elementoSVG
    .append("g") 
    .selectAll("dot") 
    .data(datos) 
    .enter()
    .append("circle")
        .attr("class", "myCircle")
        .attr("cx", d=>escalaX(d.AÑO) ) 
        .attr("cy", d=>escalaY(d.Nacidos)) 
        .attr("r", 5)
        .attr("stroke", "#68b4a2")
        .attr("stroke-width", 4) 
        .attr("fill", "blue")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove) 
        .on("mouseleave", mouseleave)

var ejeY = d3.axisLeft(escalaY)
elementoSVG
    .append("g")
    .attr("transform", "translate("+ margin.left + ",0)")
    .call(ejeY)

var ejeX = d3.axisBottom(escalaX)
elementoSVG
    .append("g")
    .attr("transform", "translate(0, " + (height - margin.botton/2)+")")
    .call(ejeX)
    })