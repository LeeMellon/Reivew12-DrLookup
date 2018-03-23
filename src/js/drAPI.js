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



  parseResponce(response){
    let drAPI = JSON.parse(response)
    for(let i = 0; i < drAPI.data.length; i ++){
      console.log(drAPI.data[i].profile.first_name);

    }
  }




}







//headache
//https://api.betterdoctor.com/2016-03-01/doctors?query=headache&location=or-portland&skip=0&limit=10&user_key=1ec70fab1a12d9a63abd865a7d4bb74e
//last_name Lee
//https://api.betterdoctor.com/2016-03-01/doctors?last_name=Lee&location=or-portland&skip=0&limit=10&user_key=1ec70fab1a12d9a63abd865a7d4bb74e
//headache first_name Jennifer last_name Lee
//https://api.betterdoctor.com/2016-03-01/doctors?first_name=Jennifer&last_name=Lee&query=headache&location=or-portland&skip=0&limit=10&user_key=1ec70fab1a12d9a63abd865a7d4bb74e
//name Kim,Jennifer
//https://api.betterdoctor.com/2016-03-01/doctors?name=Kim%2C%20Jennifer&location=or-portland&skip=0&limit=10&user_key=1ec70fab1a12d9a63abd865a7d4bb74e
