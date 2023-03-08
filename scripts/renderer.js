class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // limit_fps_flag:      bool 
    // fps:                 int
    constructor(canvas, limit_fps_flag, fps) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.limit_fps = limit_fps_flag;
        this.fps = fps;
        this.start_time = null;
        this.prev_time = null;
    }

    // flag:  bool
    limitFps(flag) {
        this.limit_fps = flag;
    }

    // n:  int
    setFps(n) {
        this.fps = n;
    }

    // idx: int
    setSlideIndex(idx) {
        this.slide_idx = idx;
    }

    animate(timestamp) {
        // Get time and delta time for animation
        if (this.start_time === null) {
            this.start_time = timestamp;
            this.prev_time = timestamp;
        }
        let time = timestamp - this.start_time;
        let delta_time = timestamp - this.prev_time;
        //console.log('animate(): t = ' + time.toFixed(1) + ', dt = ' + delta_time.toFixed(1));

        // Update transforms for animation
        this.updateTransforms(time, delta_time);

        // Draw slide
        this.drawSlide();

        // Invoke call for next frame in animation
        if (this.limit_fps) {
            setTimeout(() => {
                window.requestAnimationFrame((ts) => {
                    this.animate(ts);
                });
            }, Math.floor(1000.0 / this.fps));
        }
        else {
            window.requestAnimationFrame((ts) => {
                this.animate(ts);
            });
        }

        // Update previous time to current one for next calculation of delta time
        this.prev_time = timestamp;
    }

    //
    updateTransforms(time, delta_time) {
        // TODO: update any transformations needed for animation
        console.log(time,delta_time)
        this.tx = 100 * time/1000
        this.ty = 100 * time/1000
    }
    
    //
    drawSlide() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0();
                break;
            case 1:
                this.drawSlide1();
                break;
            case 2:
                this.drawSlide2();
                break;
            case 3:
                this.drawSlide3();
                break;
        }
    }

    //
    drawSlide0() {
        // TODO: draw bouncing ball (circle that changes direction whenever it hits an edge)
        this.drawCircle(Vector3(400, 300, 1), 100, 50, [255, 0, 0, 255]);
        
        // Following line is example of drawing a single polygon
        // (this should be removed/edited after you implement the slide)
        /*let diamond = [
            Vector3(400, 150, 1),
            Vector3(500, 300, 1),
            Vector3(400, 450, 1),
            Vector3(300, 300, 1)
        ];
        let red = [255, 0, 0, 255];
        this.drawConvexPolygon(diamond, red);*/
        let px = 0;
        let py = 0;
        /*let m = new Matrix(3, 3);
        m = mat3x3Identity(m);
        m = mat3x3Translate(m, tx, ty);
        m = Matrix.multiply([m, ]);*/
        if (Math.floor((this.tx+200)/600)%2 == 0) {
            px = ((this.tx+200)%600)+100;
        }
        else {
            px = 700-((this.tx+200)%600);
        }
        if (Math.floor((this.ty+250)/350)%2 == 0) {
            py = ((this.tx+250)%350)+150;
        }
        else {
            py = 500-((this.tx+250)%350);
        }
        //let px = ((x*(this.tx+200)+600)%500)+100;
        //let py = ((y*(this.ty+250)+600)%450)+150;
        let center = Vector3(px, py, 1);
        this.drawCircle(center, 100, 50, [255, 0, 0, 255]);
    }

    //
    drawSlide1() {
        // TODO: draw at least 3 polygons that spin about their own centers
        //   - have each polygon spin at a different speed / direction
        
        
    }

    //
    drawSlide2() {
        // TODO: draw at least 2 polygons grow and shrink about their own centers
        //   - have each polygon grow / shrink different sizes
        //   - try at least 1 polygon that grows / shrinks non-uniformly in the x and y directions


    }

    //
    drawSlide3() {
        // TODO: get creative!
        //   - animation should involve all three basic transformation types
        //     (translation, scaling, and rotation)
        
        
    }
    
    // vertex_list:  array of object [Matrix(3, 1), Matrix(3, 1), ..., Matrix(3, 1)]
    // color:        array of int [R, G, B, A]
    drawConvexPolygon(vertex_list, color) {
        this.ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3] / 255) + ')';
        this.ctx.beginPath();
        let x = vertex_list[0].values[0][0] / vertex_list[0].values[2][0];
        let y = vertex_list[0].values[1][0] / vertex_list[0].values[2][0];
        this.ctx.moveTo(x, y);
        for (let i = 1; i < vertex_list.length; i++) {
            x = vertex_list[i].values[0][0] / vertex_list[i].values[2][0];
            y = vertex_list[i].values[1][0] / vertex_list[i].values[2][0];
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
    drawCircle(center, radius, num_edges, color) {
        let c = 0.0;
        this.ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3] / 255) + ')';
        this.ctx.beginPath();
        let px = center.values[0][0] + (radius * Math.cos(c));
        let py = center.values[1][0] + (radius * Math.sin(c));
        this.ctx.moveTo(px, py);
        for(let i=0; i<num_edges; i++){
            c += 360.0/num_edges;
            px = center.values[0][0] + (radius * Math.cos(c));
            py = center.values[1][0] + (radius * Math.sin(c));
            this.ctx.lineTo(px, py);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
};
