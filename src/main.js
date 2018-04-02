import $ from 'jquery';
import './styles.css';
import { drAPI } from './js/drAPI.js'

$(document).ready(function() {
$("#dr-name-bttn").click(function(){
  let name = $("#dr-name").val()
  $("#dr-name").val("")
  $("#results").html("")
  let drQuery = new drAPI()
  let promise = drQuery.nameSearch(name)
  promise.then(function(response){
    var drBox = drQuery.parseResponce(response)
    drQuery.parseDisplay(drBox)
}, function(error){
  $("#results").text(`There was an error with you Search: ${error.message}`)
  })
 })


 $("#symptom-form-bttn").click(function(){
   let symptom = $("#symptom-form").val()
   $("#symptom-form").val("")
   $("#results").html("")
   let drQuery = new drAPI()
   let promise = drQuery.symptomSearch(symptom)
   promise.then(function(response){
     var drBox = drQuery.parseResponce(response)
     drQuery.parseDisplay(drBox)
 }, function(error){
   $("#results").text(`There was an error with you Search: ${error.message}`)
   })
  })





})
