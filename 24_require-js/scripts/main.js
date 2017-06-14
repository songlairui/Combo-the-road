requirejs.config({
  baseUrl: './',
  paths: {
    jquery: './lib/jquery.min'
  }
})
require(['jquery'], function($) {
  $('main').html('Hello World !')
})