document.addEventListener('DOMContentLoaded', function () {
	/* UPDATE CONFIG HERE!!! */
	// Where is your discourse forum hosted?
	const DISCOURSE_URL = 'https://forum.mygreatblog.com/';
	// Where is the discourse slug? Assumes you follow the HTML5 spec
	const COMMENT_SELECTOR = 'article .meta-comment'
	// Where is the number of comments *relative to COMMENT_SELECTOR*
	//  note: if you can't make a relative query connection, you will
	//   need to modify the code after `getCommentCount(articleSlug)`
	const NUMBER_SELECTOR = '.meta-count';
	// Where is the comments text *relative to COMMENT_SELECTOR*?
	//  See note tied to NUMBER_SELECTOR
	const TEXT_SELECTOR = '.meta-plural';
	// What text should be displayed when there is a single comment?
	const TEXT_SINGULAR = ' comment';
	// What text should be displayed when there is anything but a single comment?
	const TEXT_PLURAL = ' comments';

	function getCommentCount (postSlug) {

		function parseDiscourseResponse (payload) {
			if(payload && payload.posts_count && Number(payload.posts_count) - 1 >= 0)
				// payload.posts_count includes the topic header thread, so decrement
				return Promise.resolve(payload.posts_count - 1);
			return Promise.reject('Unable to fetch comment count');
		}

		// Request
		return fetch(`${DISCOURSE_URL}/t/${postSlug}.json`)
			// Check headers - `response.ok` check if the response value is 2**
			.then((response) => response.ok ? true : Promise.reject(response.statusText))
			// Get response as json object
			.then((response) => response.json())
			// Parse response
			.then(parseDiscourseResponse);
	}

	document.querySelectorAll(COMMENT_SELECTOR).forEach((article) => {;
		// dataset is used for data-* properties
		const articleSlug = article.dataset.topicSlug;
		getCommentCount(articleSlug).then((number) => {
			article.querySelector(NUMBER_SELECTOR).innerText = number;
			article.querySelector(TEXT_SELECTOR).innerText = (number == 1) ? TEXT_SINGULAR : TEXT_PLURAL;
		});
	});
});