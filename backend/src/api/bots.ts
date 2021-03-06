import { Router } from "express";
import { botGuilds, getSameGuilds } from "../utils/api";
import { Guilds, UserI, Users } from "../database/models";

const router = Router();

// router.get("/guilds/all", async (req, res) => {
//     try {
//         let bGuilds = await botGuilds();
//         console.log(bGuilds.data);
//         return res.send(bGuilds.data);
//     } catch (err) {
//         console.log(err);
//         return res.send(err);
//     }
// })

router.get("/guilds", async (req, res) => {
    const guilds = await botGuilds();
    //@ts-ignore
    const user: UserI = await Users.findOne({ uId: req.user.uId });

    if (user !== null) {
        const userGuilds = user.guilds;
        const sameGuilds = getSameGuilds(userGuilds, guilds);
        return res.send({
            sameGuilds,
            allBotGuilds: guilds,
        });
    } else
        return res.status(401).send({ status: 401, message: "Unauthorized" });

});

// router.post("/guild/:id", async (req, res) => {

//     const { id } = req.params;

//     const newDoc = await Guilds.create({
//         gId: id,
//         logChannel: "none",
//         prefix: "?",
//     });

//     return newDoc;

// });

export default router;