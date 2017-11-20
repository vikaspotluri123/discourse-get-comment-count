document.addEventListener('DOMContentLoaded', function () {
	/* UPDATE CONFIG HERE!!! */
	const DISCOURSE_URL = 'https://forum.mygreatblog.com/';
	const COMMENT_SELECTOR = 'article .meta-comment'
	const NUMBER_SELECTOR = '.meta-count';
	const TEXT_SELECTOR = '.meta-plural';
	const TEXT_SINGULAR = ' comment';
	const TEXT_PLURAL = ' comments';

	function getCommentCount (postSlug) {

		function parseDiscourseResponse (payload) {
			if(payload && payload.posts_count && Number(payload.posts_count) - 1 >= 0)
				return Promise.resolve(payload.posts_count - 1);
			return Promise.reject('Unable to fetch comment count');
		}

		return fetch(`${DISCOURSE_URL}/t/${postSlug}.json`)
			.then((response) => response.ok ? true : Promise.reject(response.statusText))
			.then((response) => response.json()).then(parseDiscourseResponse);
	}

	document.querySelectorAll(COMMENT_SELECTOR).forEach((article) => {;
		getCommentCount(article.dataset.topicSlug).then((number) => {
			article.querySelector(NUMBER_SELECTOR).innerText = number;
			article.querySelector(TEXT_SELECTOR).innerText = (number == 1) ? TEXT_SINGULAR : TEXT_PLURAL;
		});
	});
});