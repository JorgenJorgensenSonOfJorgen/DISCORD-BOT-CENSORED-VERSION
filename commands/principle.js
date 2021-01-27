module.exports = {
    name : "principle",
    description: "find principle angle of given angle in degree or radian mode. Command format is -principle mode angle (angle can include fractions and pi)",
    execute(message,args){
        if (args[0]=="desc"){
            message.channel.send(module.exports.description)
        } else{
            let anglePI;
        
            if (args.length > 1) {
                //set angle as second argument
                let angle = args[1].toLowerCase().split('/')
                //make pi into times pi
                if(angle[0].includes("pi")){
                    angle[0] = angle[0].replace("pi", "")
                    if (String(Number(angle[0])) != "NaN"){
                        anglePI = Number(angle[0])
                        angle[0] = Number(angle[0])*Math.PI
                    }
                } 
                //division
                if (angle.length > 1){
                    anglePI = anglePI/Number(angle[1])
                    angle[0] = angle[0]/Number(angle[1])
                    angle.pop()
                }
                angle[0] = Number(angle[0])
                if (String(angle[0]) != "NaN") {
                    if (args[0]== "radian"){
                        while(angle<0){
                            angle += 2*Math.PI
                            anglePI += 2
                        }
                        while (angle > 2*Math.PI){
                            angle -= 2*Math.PI
                            anglePI -=2
                        }
                        message.channel.send(angle)
                        if (!anglePI){
                            message.channel.send(angle / Math.PI + "PI")
                        } else {
                            message.channel.send(anglePI+ "PI")
                        }
                    } else if (args[0]=="degree"){
                        while(angle<0){
                            angle += 360
                        }
                        while (angle > 360){
                            angle -= 360
                        }
                        message.channel.send(angle + " Degrees")
                    } else {
                        message.channel.send("select angle unit")
                    }
                } else {
                    message.channel.send("error not a number")
                }
            } else {
                message.channel.send("not enough arguments")
            }
        }
    }
}