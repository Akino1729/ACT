export const upcoming = {
    exists: true,
    title: "Arcaea共通テスト",
    number: "第2回",
    date: "2027年1月16日実施予定",
    schedule: "実施予定",
    pdfLink: null,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdbwH0C1dw6ubCxotYqr0XpXJqIVglmb9HaDA46SOMcvZB5KQ/viewform?usp=header",
    // JST での試験日時 (YYYY, MM-1, DD, HH, MM, SS)
    examDateTime: new Date(2027, 0, 16, 20, 0, 0),  // 2027年1月16日 20:00 JST
};

export const exams = [
    {
      id: "main1",
      number: "第1回",
      title: "Arcaea共通テスト",
      date: "2026年1月10日実施",
      description: "Arcaea共通テスト",
      commentary: "",  // 出題者コメント（空の場合はトグルを表示しない）
      links: {
          question: "assets/2026/2026_question_01.pdf",
          answer: "assets/2026/2026_answer_01.pdf",
          form: "https://docs.google.com/forms/d/e/1FAIpQLSdbwH0C1dw6ubCxotYqr0XpXJqIVglmb9HaDA46SOMcvZB5KQ/viewform?usp=header",
      },
      stats: {
          statsDate: "2026.3.2時点",
          takers: 14,
          average: 52.3,
          stdDev: 12.1,
          min: 38,
          median: 49,
          max: 72,
      },
  },
];

