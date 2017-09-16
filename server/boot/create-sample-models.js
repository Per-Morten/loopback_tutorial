let async = require("async");
module.exports = function(app)
{
    let coffeeShopsDs = app.dataSources.MyMongoDS;

    function apply(err, results)
    {
        if (err)
            throw err;

        createReviews(results.reviewers, results.coffeeShops, function(err)
        {
            console.log("> models created successfully");
        })
    }


    function createCoffeeShops(output)
    {
        let migrate = function(err)
        {
            if (err)
                return output(err);

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

            app.models.CoffeeShop.create(shops, output);
        }

        coffeeShopsDs.automigrate('CoffeeShop', migrate);
    }

    let reviewDs = app.dataSources.MongoDSReview;
    function createReviewers(output)
    {
        let migrate = function(err)
        {
            if (err)
                return output(err);

            let reviewers =
            [
            {
                email: "foo@bar.com",
                password: "foobar"
            },
            {
                email: "john@doe.com",
                password: "johndoe"
            },
            {
                email: "jane@doe.com",
                password: "janedoe"
            }
            ];

            app.models.Reviewer.create(reviewers, output);
        }

        reviewDs.automigrate("Reviewer", migrate);
    }

    function createReviews(reviewers, coffeeShops, output)
    {
        let migrate = function(err)
        {
            if (err)
                return output(err);

            const DAY_IN_MS = 1000 * 60 * 60 * 24;

            let reviews =
            [
            {
                date: Date.now() - (DAY_IN_MS * 4),
                rating: 5,
                comments: "A very good coffee shop.",
                publisherId : reviewers[0].id,
                coffeeShopId: coffeeShops[0].id,
            },
            {
                date: Date.now() - (DAY_IN_MS * 3),
                rating: 5,
                comments: "Quite Pleasant.",
                publisherId: reviewers[1].id,
                coffeeShopId: coffeeShops[0].id,
            },
            {
                date: Date.now() - (DAY_IN_MS * 2),
                rating: 4,
                comments: "It was ok",
                publisherId: reviewers[1].id,
                coffeeShopId: coffeeShops[1].id,
            },
            {
                date: Date.now() - (DAY_IN_MS),
                rating: 4,
                comments: "I go here everyday.",
                publisherId: reviewers[2].id,
                coffeeShopId: coffeeShops[2].id
            }
            ];

            app.models.Review.create(reviews, output);
        }

        reviewDs.automigrate("Review", migrate);
    }

    async.parallel(
    {
        reviewers: async.apply(createReviewers),
        coffeeShops: async.apply(createCoffeeShops),
    }, apply);
};
