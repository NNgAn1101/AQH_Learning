import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { FaPlay, FaList } from 'react-icons/fa';

const LearningPage = () => {
    const { id } = useParams();
    const [lessons, setLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);

    useEffect(() => {
        // Giả lập lấy bài học (Bạn cần tạo API này ở backend nếu chưa có)
        // Hiện tại code sẽ lấy danh sách bài học mẫu nếu backend chưa trả về
        const fetchLessons = async () => {
            try {
                // Giả sử API trả về list bài học. Nếu chưa có API này, bạn cần thêm vào Backend nhé.
                // Tạm thời mình giả lập dữ liệu để Frontend không bị trắng trang
                const mockLessons = [
                    { _id: 1, TenBaiHoc: 'Giới thiệu khóa học', VideoURL: 'intro.mp4' },
                    { _id: 2, TenBaiHoc: 'Cài đặt môi trường', VideoURL: 'setup.mp4' },
                    { _id: 3, TenBaiHoc: 'Viết chương trình đầu tiên', VideoURL: 'hello.mp4' },
                ];
                setLessons(mockLessons);
                setCurrentLesson(mockLessons[0]);
            } catch (error) { console.error(error); }
        };
        fetchLessons();
    }, [id]);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <div className="flex-1 flex overflow-hidden">
                {/* Video Player (Trái) */}
                <div className="flex-1 flex flex-col items-center justify-center bg-black relative">
                    {currentLesson ? (
                        <div className="w-full h-full flex items-center justify-center">
                            {/* Ở đây dùng thẻ video HTML5 cơ bản */}
                            <video controls className="max-h-full max-w-full" src={currentLesson.VideoURL} poster="https://via.placeholder.com/1280x720/000000/FFFFFF?text=Video+Player" />
                        </div>
                    ) : (
                        <div className="text-gray-500">Chọn bài học để bắt đầu</div>
                    )}
                </div>

                {/* Playlist (Phải) */}
                <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-700 font-bold flex items-center gap-2">
                        <FaList /> Nội dung khóa học
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {lessons.map((lesson, idx) => (
                            <div 
                                key={lesson._id}
                                onClick={() => setCurrentLesson(lesson)}
                                className={`p-4 cursor-pointer hover:bg-gray-700 transition border-b border-gray-700/50 flex gap-3 ${currentLesson?._id === lesson._id ? 'bg-gray-700 border-l-4 border-primary' : ''}`}
                            >
                                <span className="text-gray-500 text-sm mt-1">{idx + 1}.</span>
                                <div>
                                    <h4 className="text-sm font-medium">{lesson.TenBaiHoc}</h4>
                                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-1"><FaPlay size={10}/> 10:00</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningPage;