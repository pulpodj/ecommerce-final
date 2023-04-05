const params = window.location.search;

const index = params.split('id=')[1];

const paramsURL = new URLSearchParams(params);

const paramsEntries = Object.fromEntries(paramsURL);

