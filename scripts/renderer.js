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
        this.theta1 = 0;
        this.theta2 = 0;
        this.theta3 = 0;
        this.scalar1 = 0;
        this.scalar2x = 1;
        this.scalar2y = 1;
        this.rotate = 0;
        this.scalex = 1;
        this.scaley = 1;
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
        if (this.slide_idx == 0) {
            this.tx = 100 * time/1000
            this.ty = 100 * time/1000
        } else if (this.slide_idx == 1) {
            this.theta1 = Math.round((this.theta1 - 270 * (delta_time/1000)) % 360);
            this.theta2 = Math.round((this.theta2 + 480 * (delta_time/1000)) % 360);
            this.theta3 = Math.round((this.theta3 + 90 * (delta_time/1000)) % 360);
        } else if (this.slide_idx == 2) {
            this.scalar1 = (this.scalar1 + 2 * (delta_time/1000)) % 2;
            this.scalar2x = (this.scalar2x - 1 * (delta_time/1000));
            if (this.scalar2x <= 0) {
                this.scalar2x = 1;
            }
            this.scalar2y = (this.scalar2y - 1.5 * (delta_time/1000));
            if (this.scalar2y <= 0) {
                this.scalar2y = 1;
            }
        } else if (this.slide_idx == 3) {
            this.translatex = 100 * time/1000;
            this.translatey = 50 * time/1000;
            this.rotate = Math.round((this.rotate + 300 * (delta_time/1000)) % 360);
            this.scalex = (this.scalex - 1 * (delta_time/1000));
            if (this.scalex <= 0) {
                this.scalex = 1;
            }
            this.scaley = (this.scaley - 2 * (delta_time/1000));
            if (this.scaley <= 0) {
                this.scaley = 1;
            }
        }

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
        //this.drawCircle(Vector3(400, 300, 1), 100, 50, [255, 0, 0, 255]);
        
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

        // First polygon
        let diamond = [
            Vector3(400, 150, 1),
            Vector3(500, 300, 1),
            Vector3(400, 450, 1),
            Vector3(300, 300, 1)
        ];

        let tran_origin1 = new Matrix(3, 3);
        mat3x3Translate(tran_origin1, -400, -300);
        console.log(tran_origin1)
        let rot_mat1 = new Matrix(3, 3);
        mat3x3Rotate(rot_mat1, this.theta1);
        let tran_back1 = new Matrix(3, 3);
        mat3x3Translate(tran_back1, 400, 300);
        let final_mat1 = tran_back1.mult(rot_mat1);
        final_mat1 = final_mat1.mult(tran_origin1);

        for (let i=0; i<diamond.length; i++) {
            diamond[i] = final_mat1.mult(diamond[i]);
        }
        this.drawConvexPolygon(diamond, [255,0,0,255]);

        // Second polygon
        let poly2 = [
            Vector3(125, 225, 1),
            Vector3(200, 300, 1),
            Vector3(125, 375, 1),
            Vector3(50, 300, 1)
        ];

        let tran_origin2 = new Matrix(3, 3);
        mat3x3Translate(tran_origin2, -125, -300);
        console.log(tran_origin2)
        let rot_mat2 = new Matrix(3, 3);
        mat3x3Rotate(rot_mat2, this.theta2);
        let tran_back2 = new Matrix(3, 3);
        mat3x3Translate(tran_back2, 125, 300);
        let final_mat2 = tran_back2.mult(rot_mat2);
        final_mat2 = final_mat2.mult(tran_origin2);

        for (let i=0; i<poly2.length; i++) {
            poly2[i] = final_mat2.mult(poly2[i]);
        }
        this.drawConvexPolygon(poly2, [0,255,0,255]);

        // Third polygon
        let poly3 = [
            Vector3(675, 225, 1),
            Vector3(750, 300, 1),
            Vector3(675, 375, 1),
            Vector3(600, 300, 1)
        ];

        let tran_origin3 = new Matrix(3, 3);
        mat3x3Translate(tran_origin3, -675, -300);
        console.log(tran_origin3)
        let rot_mat3 = new Matrix(3, 3);
        mat3x3Rotate(rot_mat3, this.theta3);
        let tran_back3 = new Matrix(3, 3);
        mat3x3Translate(tran_back3, 675, 300);
        let final_mat3 = tran_back3.mult(rot_mat3);
        final_mat3 = final_mat3.mult(tran_origin3);

        for (let i=0; i<poly3.length; i++) {
            poly3[i] = final_mat3.mult(poly3[i]);
        }
        this.drawConvexPolygon(poly3, [0,0,255,255]);
        
    }

    //
    drawSlide2() {
        // TODO: draw at least 2 polygons grow and shrink about their own centers
        //   - have each polygon grow / shrink different sizes
        //   - try at least 1 polygon that grows / shrinks non-uniformly in the x and y directions

        // Polygon 1
        let diamond = [
            Vector3(200, 150, 1),
            Vector3(300, 300, 1),
            Vector3(200, 450, 1),
            Vector3(100, 300, 1)
        ];

        let tran_origin1 = new Matrix(3, 3);
        mat3x3Translate(tran_origin1, -250, -300);
        let scale_mat1 = new Matrix(3, 3);
        mat3x3Scale(scale_mat1, this.scalar1, this.scalar1);
        let tran_back1 = new Matrix(3, 3);
        mat3x3Translate(tran_back1, 250, 300);
        let final_mat1 = tran_back1.mult(scale_mat1);
        final_mat1 = final_mat1.mult(tran_origin1);

        for (let i=0; i<diamond.length; i++) {
            diamond[i] = final_mat1.mult(diamond[i]);
        }
        this.drawConvexPolygon(diamond, [255,0,0,255]);

        // Polygon 2
        let poly2 = [
            Vector3(600, 150, 1),
            Vector3(700, 300, 1),
            Vector3(600, 450, 1),
            Vector3(500, 300, 1)
        ];

        let tran_origin2 = new Matrix(3, 3);
        mat3x3Translate(tran_origin2, -600, -300);
        let scale_mat2 = new Matrix(3, 3);
        mat3x3Scale(scale_mat2, this.scalar2x, this.scalar2y);
        let tran_back2 = new Matrix(3, 3);
        mat3x3Translate(tran_back2, 600, 300);
        let final_mat2 = tran_back2.mult(scale_mat2);
        final_mat2 = final_mat2.mult(tran_origin2);

        for (let i=0; i<poly2.length; i++) {
            poly2[i] = final_mat2.mult(poly2[i]);
        }
        this.drawConvexPolygon(poly2, [0,255,0,255]);

    }

    //
    drawSlide3() {
        // TODO: get creative!
        //   - animation should involve all three basic transformation types
        //     (translation, scaling, and rotation)
        let px = 0;
        let py = 0;
        if (Math.floor((this.translatex+200)/600)%2 == 0) {
            px = ((this.translatex+200)%600)+100;
        }
        else {
            px = 700-((this.translatex+200)%600);
        }
        if (Math.floor((this.translatey+250)/350)%2 == 0) {
            py = ((this.translatey+250)%350)+150;
        }
        else {
            py = 500-((this.translatey+250)%350);
        }
        let diamond = [
            Vector3(px, py-50, 1),
            Vector3(px+100, py, 1),
            Vector3(px, py+50, 1),
            Vector3(px-100, py, 1)
        ];
        //this.drawConvexPolygon(diamond, [255,0,0,255]);

        let tran_origin1 = new Matrix(3, 3);
        mat3x3Translate(tran_origin1, -px, -py);
        console.log(tran_origin1)
        let rot_mat1 = new Matrix(3, 3);
        mat3x3Rotate(rot_mat1, this.rotate);
        let tran_back1 = new Matrix(3, 3);
        mat3x3Translate(tran_back1, px, py);
        let final_mat1 = tran_back1.mult(rot_mat1);
        final_mat1 = final_mat1.mult(tran_origin1);

        for (let i=0; i<diamond.length; i++) {
            diamond[i] = final_mat1.mult(diamond[i]);
        }
        //this.drawConvexPolygon(poly1, [0,255,0,255]);

        let poly2 = [
            Vector3(600, 50, 1),
            Vector3(700, 300, 1),
            Vector3(600, 550, 1),
            Vector3(500, 300, 1)
        ];

        let tran_origin2 = new Matrix(3, 3);
        mat3x3Translate(tran_origin2, -600, -300);
        let scale_mat2 = new Matrix(3, 3);
        mat3x3Scale(scale_mat2, this.scalex, this.scaley);
        let tran_back2 = new Matrix(3, 3);
        mat3x3Translate(tran_back2, 600, 300);
        let final_mat2 = tran_back2.mult(scale_mat2);
        final_mat2 = final_mat2.mult(tran_origin2);

        for (let i=0; i<poly2.length; i++) {
            poly2[i] = final_mat2.mult(poly2[i]);
        }
        this.drawConvexPolygon(diamond, [0,0,255,255]);
        this.drawConvexPolygon(poly2, [0,255,0,255]);
        
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
