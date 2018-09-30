axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
  params: {
    part: 'snippet',
    playlistId: 'PLnw0oJfCMWaR10TuwTXmLVUQS6CPvOCd2', // good id
    maxResults: 6, 
    key: 'AIzaSyBg0oosTPGdnxUkoB2Y0nlg4fAPA7MbF0U'
  }
})
.then(function (response) {
  initVue(response.data.items);
})
.catch(function (error) {
  console.log(error);
});

function initVue(moveInfo){
  var vm = new Vue({
    el: "#list",
    data: {
      items:[]
    },
    created: function(){
      for(var i = 0; i < moveInfo.length; i++){
        this.items.push(moveInfo[i]);
      }
    },
    methods: {
      movieDetail: function (index) {
        var videoId = this.items[index].snippet.resourceId.videoId;
        var title = this.items[index].snippet.title;

        var mainVideoElem = document.querySelector('#main-video');
        // Delete Processing
        
        var move = document.querySelector('iframe');
        var moveTitleElem = document.querySelector('#moveTitle');
        mainVideoElem.removeChild(move);
        
        // Additional Processing
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/'+ videoId +'?rel=0';
        iframe.width = "600";
        iframe.height = "315";
        mainVideoElem.appendChild(iframe);
        moveTitleElem.innerHTML = title;
      }
    }
  });
}