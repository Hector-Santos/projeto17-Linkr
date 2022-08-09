import { getLink } from "../repositories/linksRepository.js";
import { getTimelinePosts } from "../repositories/postsRepository.js";
import getMetadata from "../utils/getMetadata.js";

async function getTimeline(req, res, next){

    try {
        
        const posts = await getTimelinePosts();
        res.send(posts);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

};

async function getMetadataFromLink(req, res, next){

    const { linkId } = req.params;

    try {
        
        const linkData = await getLink(linkId);
        if(!linkData) return res.sendStatus(404);

        const { title, description, image } = await getMetadata(linkData.url);
        res.send({ title, description, image });

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

export {
    getTimeline,
    getMetadataFromLink
}