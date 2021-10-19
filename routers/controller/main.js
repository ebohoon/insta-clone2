const Postings = require('../schema/postings.js');

postPostings = async (req, res) => {


    const {text} = req.body;
    const {
        nickname,
        image
    } = res.locals.user;


    try {
        

        // 사용자 조회 - nick을 가져오기 위해 필요
        // const user = await User.findById(userId);
        const posting = {


            nickname: nickname,
            image,
            text,
            createdAt,
        };

        await Postings.create(posting);
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: "게시물 생성 실패하였습니다."
        });
    }
};