var menu = new function() {
    this.menu = $(".content nav");
    this.active = this.menu.children(".active");
    this.activeWidth = 0;
    this.activePosition = {
        top: 0,
        left: 0
    };
    this.speed = 500;
    this.clicked = 0;
    this.slide = $('.content nav button');
    this.initSlide = function() {
        if (this.active.length) {
            this.activeWidth = this.active.width();
            this.activePosition = this.active.position()
        }
        this.slide.width(this.activeWidth);
        this.slide.css("left", this.activePosition.left);
        this.slide.appendTo(this.menu);
    };
    this.slideMeIn = function(e) {
        this.newActiveWidth = e.width();
        this.newActivePosition = e.position();
        this.slide.stop(true).animate({
            left: this.newActivePosition.left,
            width: this.newActiveWidth
        }, this.speed)
    };
    this.slideMeOut = function() {
        if (!this.clicked) {
            this.slide.stop(true).animate({
                left: this.activePosition.left,
                width: this.activeWidth
            }, this.speed) 
        } 
    }
};
