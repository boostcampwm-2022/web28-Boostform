import { Response } from "express";

interface CallFormListRequest {
  params: {
    userName: string;
    page: number;
  };
}

function toDateString(date: Date): string {
  const yearString = date.getFullYear();
  const monthString = date.getMonth() + 1 < 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const dateString = date.getDate() < 10 ? `${date.getDate()}` : `0${date.getDate()}`;
  return `${yearString}-${monthString}-${dateString}`;
}

function sendFormListMockData(req: CallFormListRequest, res: Response) {
  const { page } = req.params;
  const num = (index: number) => (page - 1) * 5 + index;
  const str = (index: number) => `${num(index)}`;
  const date = new Date();
  const dateString = toDateString(date);
  const makeFormOnList = (index: number) => {
    return {
      id: str(index),
      title: str(index),
      response: num(index),
      createdAt: dateString,
      updatedAt: dateString,
      onBoard: true,
      category: "개발",
    };
  };

  res.json({
    form: [makeFormOnList(1), makeFormOnList(2), makeFormOnList(3), makeFormOnList(4), makeFormOnList(5)],
  });
}

export default sendFormListMockData;
