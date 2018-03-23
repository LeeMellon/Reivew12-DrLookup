import $ from 'jquery';
import './styles.css';
import { drAPI } from './js/drAPI.js'

$(document).ready(function() {
  console.log("key " + process.env.API_KEY);
$("#form-bttn").click(function(){
  let name = $("#dr-name").val()
  console.log(name);
  $("#dr-name").val("")

  let question = new drAPI
  let promise = question.nameSearch(name)
  promise.then(function(response){
    question.parseResponce(response)
}, function(error){
  $("#results").text("There was an error with you Search: ${error.message}")
  })
 })
})
