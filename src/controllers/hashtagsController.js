import { getTrending, getHashtagPosts, countHashtagPosts } from "../repositories/hashtagsRepository.js";

async function getCurrentTrending(req, res, next){

    try {
        
        const trendingHashtags = await getTrending();
        res.send(trendingHashtags);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

};

async function getCountHashtagPosts(req, res, next){

    const { hashtagName } = req.params;
   
    try {

        const count = await countHashtagPosts(hashtagName);

        count[0]? res.send(count[0].count) : res.send(0)


    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

};

async function hahstagPosts(req, res, next){

    const { hashtagName } = req.params;
    let offset = 0
    req.params.offset? offset = req.params.offset : offset = 0

    try {
        
        const posts = await getHashtagPosts(hashtagName,offset);
        res.send(posts);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

};

export {
    getCurrentTrending,
    hahstagPosts,
    getCountHashtagPosts
};