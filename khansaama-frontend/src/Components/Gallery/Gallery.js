import React from 'react'

function Gallery() {
    return (
        <div>
        <section id="gallery" className="gallery">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Gallery</h2>
            <p>Some photos from Our Chefs Kitchens</p>
          </div>
        </div>
        <div className="container-fluid" data-aos="fade-up" data-aos-delay={100}>
          <div className="row no-gutters">
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-1.jpg" className="venobox" data-gall="gallery-item">
                  <img src="assets/img/gallery/gallery-1.jpg" alt="e" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-2.jpg" className="venobox" data-gall="gallery-item">
                  <img src="assets/img/gallery/gallery-2.jpg" alt="p" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-3.jpg" className="venobox" data-gall="gallery-item">
                  <img src="assets/img/gallery/gallery-3.jpg" alt="j" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-4.jpg" className="venobox" data-gall="gallery-item">
                  <img src="assets/img/gallery/gallery-4.jpg" alt="u" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-5.jpg" className="venobox" data-gall="gallery-item">
                  <img src="assets/img/gallery/gallery-5.jpg" alt="h" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-6.jpg" className="venobox" data-gall="gallery-item">
                  <img src="assets/img/gallery/gallery-6.jpg" alt="h" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-7.jpg" className="venobox" data-gall="gallery-item">
                  <img src="assets/img/gallery/gallery-7.jpg" alt="r" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/img/gallery/gallery-8.jpg" className="venobox" data-gall="gallery-item">
                  <img src="assets/img/gallery/gallery-8.jpg" alt="r" className="img-fluid" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}

export default Gallery
