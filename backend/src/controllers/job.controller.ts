import { Request, Response } from 'express';
import { Job } from '../models/Job';
import mongoose from 'mongoose';

// Get all jobs for logged-in user
export const getJobs = async (req: any, res: Response) => {
  const jobs = await Job.find({ userId: req.user.userId }).sort({ createdAt: -1 });
  res.json(jobs);
};

// Create new job
export const createJob = async (req: any, res: Response) => {
  const { title, company, status, tags, ctc, dateOfDrive } = req.body;
  const job = await Job.create({
    title,
    company,
    ctc,
    dateOfDrive,
    status: status || 'applied',
    tags: tags || [],
    userId: req.user.userId
  });
  res.status(201).json(job);
};

// Update job by ID
export const updateJob = async (req: any, res: Response) => {
  const { id } = req.params;
  const job = await Job.findOneAndUpdate(
    { _id: id, userId: req.user.userId },
    req.body,
    { new: true }
  );
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
};

// Delete job by ID
export const deleteJob = async (req: any, res: Response) => {
  const { id } = req.params;
  const job = await Job.findOneAndDelete({ _id: id, userId: req.user.userId });
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json({ message: 'Job deleted' });
};

// Analytics endpoint
export const getAnalytics = async (req: any, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const statusCounts = await Job.aggregate([
    { $match: { userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  // Applications over time (by created date)
  const timeline = await Job.aggregate([
    { $match: { userId } },
    { $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      count: { $sum: 1 }
    }},
    { $sort: { _id: 1 } }
  ]);
  res.json({ statusCounts, timeline });
};
