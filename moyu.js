class Moyu {
  constructor(name, width) {
    this.name = name;
    this.width = width;
    this.side = 32;
  }

  initVideo(){
    let video = document.createElement('video');
    video.controls = 'controls';
    video.width = this.width;
    video.src = './test.mp4';
		video.autoplay = "autoplay";
    document.body.appendChild(video);
    this.video = video;
    this.bindVideoEvents()
  }

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = this.side;
  }

  bindVideoEvents() {
    this.video.addEventListener('timeupdate', () => {
      this.videoToImage()
    }, false)
  }

  setFavico(){
		const url = this.canvas.toDataURL('image/png');
		let icons = [...document.querySelector('head').querySelectorAll('link')]
					  .filter(link=>{
						const rel = link.getAttribute('rel') || ''
						return rel.indexOf('icon')>-1
					  })
		if(icons.length){
		  icons.forEach(icon=>icon.setAttribute('href', url))
		}else{
			const icon = document.createElement('link')
			icon.setAttribute('rel', 'icon')
			icon.setAttribute('href', url)
			document.querySelector('head').appendChild(icon)
		}
	}

  videoToImage() {
    let context = this.canvas.getContext('2d');
    context.clearRect(0,0,this.side, this.side);
    context.drawImage(this.video, 0, 0, this.side, this.side);
    const url = this.canvas.toDataURL('image/png');
    document.getElementById('image').src = url;
    this.setFavico();
  }

  init() {
    this.initVideo()
    this.initCanvas()
  }
}
let moyu = new Moyu('xiaohou', 200)
moyu.init()


