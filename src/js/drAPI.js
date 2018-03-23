import $ from 'jquery';


export class drAPI{


  nameSearch(name){
    return new Promise(function(resolve, reject){
      let apiKey = process.env.API_KEY
      let request = new XMLHttpRequest()
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=or-portland&skip=0&limit=10&user_key=${process.env.API_KEY}`
      request.onload = function() {
        if (this.status == 200) {
          resolve(request.response)

        } else {
          reject(Error(request.statusText))
        }
      }
      request.open("GET", url, true)
      request.send()
    })
  }

  symptomSearch(symptom){
    return new Promise(function(resolve, reject){
      let apiKey = process.env.API_KEY
      let request = new XMLHttpRequest()
      let url = `  https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&location=or-portland&skip=0&limit=10&user_key=${process.env.API_KEY}`
      request.onload = function() {
        if (this.status == 200) {
          resolve(request.response)

        } else {
          reject(Error(request.statusText))
        }
      }
      request.open("GET", url, true)
      request.send()
    })
  }





  parseResponce(response){
    let drBox = []
    let drAPI = JSON.parse(response)
    // console.log(drAPI);
    for(let i = 0; i < drAPI.data.length; i ++){
      for(let j = 0; j < drAPI.data[i].practices.length; j ++){
      var fName = drAPI.data[i].profile.first_name
      var lName = drAPI.data[i].profile.last_name
      var drImg = drAPI.data[i].profile.image_url
      var bio = drAPI.data[i].profile.bio
      if (drAPI.data[i].practices[j].location_slug == "or-portland"){
          var phone = drAPI.data[i].practices[j].phones[0].number
          var city = drAPI.data[i].practices[j].visit_address.city
          var street = drAPI.data[i].practices[j].visit_address.street
          var zip = drAPI.data[i].practices[j].visit_address.zip
          var acceptingNew = drAPI.data[i].practices[j].accepts_new_patients
          if (drAPI.data[i].practices[j].website != null){
          var webAdd = drAPI.data[i].practices[j].website
        } else {
          webAdd = ""
        }
        if(drAPI.data[i].specialties.length> 0){
          var school = drAPI.data[i].specialties[0].actor
          var specialty = drAPI.data[i].specialties[0].description
        }else{
          school = ""
          specialty =""
        }
      }
    }
    let drBinder = {"fName": fName, "lName": lName, "drImg": drImg, "bio": bio, "school": school, "specialty" : specialty, "city": city, "street": street, "zip": zip, "phone": phone, "webAdd": webAdd, "acceptingNew": acceptingNew }
    drBox.push(drBinder)
  }
  return drBox
}

parseDisplay(drBox){
  drBox.forEach(function(doc){
    if(doc.acceptingNew == true){
      var accepting = "Yes"
      // console.log(accepting);
    } else{
      accepting = "Not at this time"
    } if(doc.webAdd != ""){
      var webSite = '<br><h5> Website : '+ doc.webAdd + '</h5><br>'
    } else {
      webSite = '<br>'
    } if (doc.school != ""){
      var schoolSpec = '<br><h4> Practice: '+ doc.school +'</h4><br><h4> Specialty: ' + doc.specialty +'</h4><br>'
    } else {
      schoolSpec = '<br>'
    }

    let appendedDiv = '<div class="dr-div"><img src="'+ doc.drImg +'"alt=" picture of Dr' +  doc.lName + '">  <h3>' + doc.fName + ' ' + doc.lName + '</h3>' + schoolSpec + '<h4> Bio: '+ doc.bio +'</h4><br><h4> Address: '+ doc.street + '<br>' + doc.city + 'Portland, Or' + doc.zip + '</h4>' + webSite + '<h5> Accepting new Patients ' + accepting + '</h5><br></div>'

    $("#results").append(appendedDiv)
    // console.log(appendedDiv);
})
}

}
