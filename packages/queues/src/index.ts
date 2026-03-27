import { Queue } from 'bullmq';
import { connection } from '../connection';

// Default settings for standard queues
const defaultOptions = {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
  },
};

// 1. Email Queue
// @ts-ignore: type mismatch between ioredis versions
export const emailQueue = new Queue('emailQueue', defaultOptions);

// 2. PDF Queue
// @ts-ignore: type mismatch between ioredis versions
export const pdfQueue = new Queue('pdfQueue', defaultOptions);

// 3. Scheduled Queue
// @ts-ignore: type mismatch between ioredis versions
export const scheduledQueue = new Queue('scheduledQueue', defaultOptions);

// 4. Payment Queue (with specific retry and failure settings)
// @ts-ignore: type mismatch between ioredis versions
export const paymentQueue = new Queue('paymentQueue', {
  // @ts-ignore: type mismatch between ioredis versions
  connection,
  defaultJobOptions: {
    attempts: 5,           // Extra retry attempts
    removeOnFail: false,   // Failed jobs are never discarded
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});