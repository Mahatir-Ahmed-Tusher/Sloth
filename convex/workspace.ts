import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkSpace = mutation({
  args: {
    message: v.any(),
    user: v.id('users'),
  },
  handler: async (ctx, args) => {
    try {
      // Verify the user exists
      const user = await ctx.db.get(args.user);
      if (!user) {
        throw new Error("User not found");
      }
      
      const workspaceId = await ctx.db.insert('workspace', {
        message: args.message,
        user: args.user,
      });
      return workspaceId;
    } catch (error) {
      console.error("Error creating workspace:", error);
      throw error;
    }
  },
});

export const GetWorkspace = query({
  args:{
    workspaceId:v.id('workspace')
  },
  handler: async (ctx, args) =>{
    try {
      const result = await ctx.db.get(args.workspaceId);
      return result;
    } catch (error) {
      console.error("Error fetching workspace:", error);
      return null;
    }
  }
})

export const UpdateMessages = mutation({
  args:{
    workspaceId:v.id('workspace'),
    message:v.any()
  },
  handler:async (ctx, args)=>{
    try {
      const result = await ctx.db.patch(args.workspaceId, {message: args.message})
      return result;
    } catch (error) {
      console.error("Error updating messages:", error);
      throw error;
    }
  }
})

export const UpdateFiles = mutation({
  args:{
    workspaceId:v.id('workspace'),
    fileData:v.any()
  },
  handler:async (ctx, args)=>{
    try {
      const result = await ctx.db.patch(args.workspaceId, {fileData: args.fileData})
      return result;
    } catch (error) {
      console.error("Error updating files:", error);
      throw error;
    }
  }
})

export const GetUserWorkspaces = query({
  args: {
    userId: v.id('users')
  },
  handler: async (ctx, args) => {
    try {
      const workspaces = await ctx.db
        .query('workspace')
        .filter((q) => q.eq(q.field('user'), args.userId))
        .order('desc')
        .take(10);
      return workspaces;
    } catch (error) {
      console.error("Error fetching user workspaces:", error);
      return [];
    }
  }
})