'use strict';

module.exports = function(CoffeeShop)
{
    CoffeeShop.status = function(output)
    {
        let currentHour = new Date().getHours();
        const OPEN_HOUR = 6;
        const CLOSE_HOUR = 20;
        console.log("Current hour is %d", currentHour);

        let response = (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR)
                     ? "We are open for business."
                     : "Sorry, we are closed, open daily from 6am to 8pm.";

        output(null, response);
    };

    CoffeeShop.remoteMethod(
        "status",
        {
            http:
            {
                path: "/status",
                verb: "get"
            },
            returns:
            {
                arg: "status",
                type: "string"
            }
        }
    );

    CoffeeShop.getName = function(shopId, output)
    {
        CoffeeShop.findById(shopId, function(err, instance)
        {
            let response = "Name of coffee shop is " + instance.name;
            output(null, response);
            console.log(response);
        });
    }

    CoffeeShop.remoteMethod(
        "getName",
        {
            http: {path: "/getname", verb: "get"},
            accepts: {arg: "id", type: "string", http: {source: "query"}},
            returns: {arg: "name", type: "string"}
        }
    );
};
