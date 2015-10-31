// spec.js
describe('Protractor Demo App', function () {
    var posts = element.all(by.repeater('post in posts'));

    it('submit button must be disabled/enabled if fields empty/full', function () {

        browser.get('http://localhost:8000/#/tab/new-post');
        var emailText = element(by.model('formData.email'));
        var titleText = element(by.model('formData.title'));
        var contentText = element(by.model('formData.content'));
        var submitButton = element(by.id('submit'));

        expect(submitButton.isEnabled()).toEqual(false);
        emailText.sendKeys('a@b.c');
        titleText.sendKeys('test title');
        contentText.sendKeys('test content.');
        expect(submitButton.isEnabled()).toEqual(true);
        submitButton.click();
    });

    it('posts length ust be 10', function () {
        browser.get('http://localhost:8000/#/tab/posts');
        expect(posts.count()).toEqual(10);

    });

    it("first post's title must be 'test title'", function () {

        browser.get('http://localhost:8000/#/tab/posts');

        var firstPostTitle = element(by.repeater('post in posts').row(0).column('post.title'));
        expect(firstPostTitle.getText()).toEqual('test title');

    });

});