import {
  createSegment,
  deleteSegment,
  getSegmentById,
  getSegments,
  updateSegment,
  getSegmentAttachments,
  deleteAttachment,
  getSegmentBySlug,
} from "~/data-access/segments";
import type { Segment, SegmentCreate, User } from "~/db/schema";
import { deleteFile } from "~/storage";

export async function getSegmentsUseCase() {
  return getSegments();
}

export async function getSegmentBySlugUseCase(slug: Segment["slug"]) {
  return getSegmentBySlug(slug);
}

export async function getSegmentByIdUseCase(id: Segment["id"]) {
  return getSegmentById(id);
}

export async function addSegmentUseCase(segment: SegmentCreate) {
  return createSegment(segment);
}

export async function editSegmentUseCase(
  id: number,
  segment: Partial<SegmentCreate>
) {
  return updateSegment(id, segment);
}

export async function removeSegmentUseCase(id: number) {
  return deleteSegment(id);
}

export async function updateSegmentUseCase(
  segmentId: number,
  data: {
    title: string;
    content: string;
    videoKey?: string;
    moduleId: string;
    slug: string;
  }
) {
  const { title, content, videoKey, moduleId, slug } = data;

  const segment = await getSegmentById(segmentId);
  if (!segment) throw new Error("Segment not found");

  if (segment.videoKey && videoKey) {
    await deleteFile(segment.videoKey);
  }

  return await updateSegment(segmentId, {
    title,
    content,
    videoKey,
    moduleId,
    slug,
  });
}

export async function deleteSegmentUseCase(segmentId: number) {
  const segment = await getSegmentById(segmentId);
  if (!segment) throw new Error("Segment not found");

  // Delete video file if it exists
  if (segment.videoKey) {
    await deleteFile(segment.videoKey);
  }

  // Get and delete all attachment files
  const attachments = await getSegmentAttachments(segmentId);
  await Promise.all(
    attachments.map(async (attachment) => {
      await deleteFile(attachment.fileKey);
      await deleteAttachment(attachment.id);
    })
  );

  // Finally delete the segment (this will cascade delete attachments due to foreign key)
  return deleteSegment(segmentId);
}
