import $ from 'jquery';
import './styles.css';
import { drAPI } from './js/drAPI.js'

$(document).ready(function() {
$("#form-bttn").submit(function(event){
  event.preventDefault()
  let name = $("#dr-name").val()
  $("#dr-name").val("")

  let question = new drAPI
  let promise = question.nameSearch(name)
  promise.then(function(response){
    question.parseResponse(response)
}, function(error){
  $("#results").text("There was an error with you Search: ${error.message}")
  })
 })
})
