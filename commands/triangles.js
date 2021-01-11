module.exports = {
    name : "triangle",
    description: "how many triangles in a polygon with n sides",
    execute(message,args){
        if (args[0]== 'desc'){
            message.channel.send(module.exports.description)
        } else {
            if(args[0]>=3 && Math.round(Number(args[0])) == Number(args[0])) {
            message.channel.send(calcTriangles(args[0]) + " interior triangles meaning " + calcAngle(args[0], 180) + " degrees or " + calcAngle(args[0], 1) + "PI radians")
            }
            function calcTriangles(numSides) {
                return numSides - 2
            }
            function calcAngle(numSides, mode){
                return calcTriangles(numSides) * mode
            }
        }
    }
}
