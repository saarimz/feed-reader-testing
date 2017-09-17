/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it("URLs are defined and not empty",() => {
            for (let item of allFeeds) {
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toBe(0);
            }
         });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it("Names are defined and not empty", () => {
            for (let item of allFeeds) {
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toBe(0);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The Menu', () => {
           /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */


        it("starts off hidden",() => {
            expect($("body").hasClass('menu-hidden')).toEqual(true);
        });
             /* Write a test that ensures the menu changes
              * visibility when the menu icon is clicked. This test
              * should have two expectations: does the menu display when
              * clicked and does it hide when clicked again.
              */

        let btn = $(".menu-icon-link");

        it("should change visibility if icon if clicked", () => {
            btn.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            btn.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });
            



    /* Write a new test suite named "Initial Entries" */

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    describe("Initial Entries", () => {

        let input = 1;

        beforeEach((done) => {
            loadFeed(input, function(){
                done();
            });
        });

        it("there should at least be a single entry within the feed", (done) => {
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        });
        
    });
    /*  Write a new test suite named "New Feed Selection" */
    /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

    describe("New Feed Selection", () => {

        let currentContent, previousContent;

        beforeEach((done) => {
            loadFeed(0,function(){
                previousContent = $(".feed").contents().find("h2")[0].innerHTML;
                done();
            });
        });

        it("the content should actually change when a new feed is loaded", (done) => {
            loadFeed(1,function(){
                currentContent = $(".feed").contents().find("h2")[0].innerHTML;
                expect(previousContent).not.toEqual(currentContent);
                done();
            });
        });
    });
        
}());
