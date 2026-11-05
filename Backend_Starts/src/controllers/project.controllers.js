import {User} from "../models/user.models.js"
import {ApiResponse} from "../utils/api-response.js";
import {ApiError} from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import mongoose from "mongoose";
import { UserRolesEnum } from "../utils/constants.js";

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectMember.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      $lookup: {
        from: "projects",
        localField: "projects",
        foreignField: "_id",
        as: "project"
      }
    },
    {
      $unwind: "$project"
    },
    {
      $lookup: {
        from: "projectmembers",
        localField: "projects",
        foreignField: "projects",
        as: "projectmembers"
      }
    },
    {
      $addFields: {
        "project.members": {
          $size: "$projectmembers"
        }
      }
    },
    {
      $project: {
        _id: 0,
        role: 1,
        project: {
          _id: "$project._id",
          name: "$project.name",
          description: "$project.description",
          members: "$project.members",
          createdAt: "$project.createdAt",
          createdBy: "$project.createdBy"
        }
      }
    }
  ]);

  return res.status(200).json(
    new ApiResponse(200, projects, "Project Fetched Successfully")
  );
});

export const getProjectById=asyncHandler(async(req,res)=>{
  const {projectId}= req.params;
  const project=await Project.findById(projectId);

  if(!project){
    throw new ApiError(404,"Project not found");
  }

  return res.status(200).json(
    new ApiResponse(200,project,"Project Fetched Successfully")
  )
});

export const CreateProject=asyncHandler(async(req,res)=>{
    const {name,description}=req.body;
    const project=await Project.create({
        name,
        description,
        createdBy: new mongoose.Types.ObjectId(req.user._id),

    });
    await ProjectMember.create({
        user:new mongoose.Types.ObjectId(req.user._id),
        project: new mongoose.Types.ObjectId(project._id),
        role:UserRolesEnum.ADMIN
    })

    return res.
            status(201)
            .json(
                new ApiResponse(
                    201,project,"Project Created Successfully"
                )
            )
});

export const UpdateProjects=asyncHandler(async(req,res)=>{
    const {name,description}=req.body;
    const {projectId}=req.params;

    const project=await Project.findByIdAndUpdate(
        projectId,
        {name,
            description
        },
        {new:true}
    )
    if(!project){
        throw new ApiError(404,"Project Not Found");
    }
    return res.
            status(200)
            .json(
                new ApiResponse(
                    200,
                    project,
                    "Project Updated SuccessFully"
                )
            )
});

export const DeleteProjects=asyncHandler(async(req,res)=>{
    const {projectId}=req.params;
    const project= await Project.findByIdAndDelete(projectId);
    if(!project){
        throw new ApiError(404,"Project Not Found");
    }
    return res.
            status(200)
            .json(
                new ApiResponse(
                    200,
                    project,
                    "Project Deleted SuccessFully"
                )
            )
});

export const addMembersToProject=asyncHandler(async(req,res)=>{
  const {email,role}=req.body;
  const {projectId}=req.params;
  const user=await User.findOne({email});
  if(!user){
    throw new ApiError(404,"User not found");
  }
  await ProjectMember.findByIdAndUpdate(
    {
      user: new mongoose.Types.ObjectId(user._id),
      project:new mongoose.Types.ObjectId(projectId)
    },
    {
      user: new mongoose.Types.ObjectId(user._id),
      project:new mongoose.Types.ObjectId(projectId),
      role:role,
    },
    {
      new :true,
      upsert:true
    }
  )

  return res.status(201).
                    json(new ApiResponse(201,{},
                      "Project member added successfully"
                    ))
});

export const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project does not exist");
  }

  const projectMembers = await ProjectMember.aggregate([
    {
      $match: {
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        user: {
          $arrayElemAt: ["$user", 0],
        },
      },
    },
    {
      $project: {
        project: 1,
        user: 1,
        role: 1,
        createdAt: 1,
        createdBy: 1,
        _id: 0,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(200, projectMembers, "Project members fetched")
  );
});

export const UpdateMemberRoles=asyncHandler(async(req,res)=>{

});

export const deleteMember=asyncHandler(async(req,res)=>{

});
