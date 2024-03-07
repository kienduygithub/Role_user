import './Home.scss';
import { connect } from "react-redux";
const Home = () => {
    
    return (
        <div className='home-container container mt-3'>
            <div className='video-wrapper'>
                <iframe
                    // width={560}
                    // height={315}
                    src="https://www.youtube.com/embed/wKXuPVoAr7A"
                    title="[S9] Tuyển Tập Hoạt Hình Doraemon Phần 11 - Trọn Bộ Hoạt Hình Doraemon Lồng Tiếng Viêt"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Home);