console.log("hello");

function run(){
	console.log("run hello");
	slider.init();
	console.log(slider.slides);
}



const slider = {
	currentSlideNumber: 0,
	nextSlide: "",
	slides: [],
	slidesNumber: "",
	slideDirection: "",
	sliding: false,
	silderDisplayLayout(){
		this.slides.forEach(function(slide){
			slide.style.order = 10;
		});
	},
	displayNextSlide(){
		this.sliding = true;
		this.slides[this.nextSlide].style.order = 5;
		$(slider.slides[slider.nextSlide])
		.animate({left: `${slider.slideDirection}`}, "slow", function(){
			this.style.order = 0;
			this.style.left = 0;
			slider.currentSlideNumber = slider.nextSlide;
			slider.sliding = false;
		});
	},
	hideCurrentSlide(){
		this.slides[this.currentSlideNumber].style.order = 0;
		$(slider.slides[slider.currentSlideNumber])
		.animate({left: `${slider.slideDirection}`}, "slow", function(){
			this.style.order = 10;
			this.style.left = 0;
		});
	},
	controls(forward){
		if(this.sliding == false){
			if(forward === true){
				$(".slider_container").css("flex-direction", "row");
				this.slideDirection = "-600px";
				if(this.currentSlideNumber < this.slidesNumber - 1){
					this.nextSlide = this.currentSlideNumber + 1;
				}
				else{
					this.nextSlide = 0;
				}
			}
			else{
				$(".slider_container").css("flex-direction", "row-reverse");
				this.slideDirection = "600px";
				if(this.currentSlideNumber > 0){
					this.nextSlide = this.currentSlideNumber - 1;
				}
				else{
					this.nextSlide = this.slidesNumber - 1;
				}
			}
			this.hideCurrentSlide();
			this.displayNextSlide();
		}
		
	},
	controlsSetting(){
		$("#previous").click(function(){
			slider.controls(false);
		});
		$("#next").click(function(){
			slider.controls(true);
		});
		$(document).keydown(function(e) {
			console.log(e.which);
			if(e.which == 37){
				slider.controls(false);
				console.log(slider.sliding);
			}
			else if(e.which == 39){
				slider.controls(true);
				console.log(slider.sliding);
			}
		});
	},
	init(){
		this.slides = Array.from($(".slide"));
		this.slidesNumber = this.slides.length;
		this.silderDisplayLayout();
		this.controlsSetting();
	}

};

function slideAnimation(){

}
$(".test")
.click(function(element){
	$(this).addClass('shrink')
});

$(".test").on("transitionend", function(e){
	$(this).animate({
		width: "+=100px",
		height: "+=100px"},
		2000, function() {
			console.log("finie");
		});
});


