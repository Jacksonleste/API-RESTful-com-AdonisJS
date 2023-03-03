/* eslint-disable eqeqeq */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Moment from 'App/Models/Moment'

export default class CommentsController {

    public async store({params, request, response}:HttpContextContract){
        const body = request.body()
        const momentId = params.momentId

        await Moment.findOrFail(momentId)

        body.momentId = momentId;

        const comment = await Comment.create(body)

        response.status(201)

        return {
            message: 'Comentário adicionado com sucesso!',
            data: comment
        }
    }

    public async update({params, request, response}:HttpContextContract){
        const body = request.body()

        const momentId = params.momentId

        await Moment.findOrFail(momentId)

        const comment = await Comment.findOrFail(params.id)

        if (comment.momentId == momentId){
            comment.comment = body.comment

            await comment.save()

            response.status(201)
            
            return {
                msg: "Comentário Atualizado",
                data: comment
            }
        }else{
            response.status(204)
        }
    }

    public async destroy({params, request, response}:HttpContextContract){
        const body = request.body()

        const momentId = params.momentId

        await Moment.findOrFail(momentId)

        const comment = await Comment.findOrFail(params.id)

        if (comment.momentId == momentId){

            await comment.delete()

            response.status(201)
            
            return {
                msg: "Comentário Removido!",
                data: comment
            }
        }else{
            response.status(204)
        }
    }
}
