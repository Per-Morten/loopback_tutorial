module.exports = function(app)
{
    let migrate = function(err)
    {
        if (err)
            throw err;

        let func = function(err, coffeeShops)
        {
            if (err)
                throw err;

            console.log('Models created: \n', coffeeShops);
        }

        let shops =
        [
            {
                name: 'Bel Cafe',
                city: 'Vancouver'
            },
            {
                name: 'Three Bees Coffee House',
                city: 'San Mateo'
            },
            {
                name: 'Caffe Artigiano',
                city: 'Vancouver'
            },
        ];

        app.models.CoffeeShop.create(shops, func);
    }

    app.dataSources.MyMongoDS.automigrate('CoffeeShop', migrate);
};
