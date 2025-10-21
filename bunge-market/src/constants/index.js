export const CATEGORIES = [
'디지털', '의류', '도서', '생활', '스포츠', '기타'
];


export const MAJORS = [
'컴퓨터공학', '전기전자', '기계', '산공', '수학', '물리', '기타'
];


// 상태 등급(검수 결과) — 정렬용 가중치
export const GRADES = ['S', 'A', 'B', 'C'];
export const GRADE_ORDER = GRADES.reduce((acc, g, i) => { acc[g] = i; return acc; }, {});


export const STATUS = ['판매중', '예약중', '판매완료'];