import { TimeLike } from "fs";

export type IQuestion = {
	hyperlink: string;
  questionContents: string;
  questionHyperlink?: string;
  userId: number;
  answered: boolean;
  inTrash: boolean;
  inCollection: boolean;
  uploadTime: TimeLike;
  noteType: number;
  tapeType: number;
  tapePosition: number;
  id: number;
}

export type IAnswer = {
  answerContents: string;
  questionId: number;
  uploadTime: TimeLike;
}

export type IMapQuestionAnswer = {
  Question: IQuestion;
  Answer: IAnswer;
}


export interface colorDataType {
	colorName: string | undefined;
	colorCode: string | undefined;
}