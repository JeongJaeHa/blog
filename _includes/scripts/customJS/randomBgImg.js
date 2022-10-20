const bg = document.querySelector(".random_BG");

const bgList = [
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc32pAY%2FbtrMdL3Kaak%2FTHtYTK5Byfpe788CvC4mX1%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcbvFwn%2FbtrMec0RaYV%2FxXJn9MB7nOZsRkDHNhQkGk%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdX4FZq%2FbtrMdN8nuuU%2FkrFw4QnaKKX7mbIwszRqKk%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FRLH1A%2FbtrMedlbGDB%2FoDX9kVkZL9dKAb2GIdfSak%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcqYKia%2FbtrMdDEWEJC%2Fk9wuaaPE9IzXigK8JboFdk%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FoHDFK%2FbtrMcRpQhac%2Fp5m0nSl3durvatK0lcw2Kk%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FddUziw%2FbtrMfdZdYIy%2FJr7yx6N9GKeL4Bs9JzykCk%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fey8fWm%2FbtrMdNAxeaO%2FYZUGWJybQPzF4x8D1o6Cyk%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLecRG%2FbtrMdGawqz1%2FDkh2KykYTssrVHwNm9FqZ0%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPho3I%2FbtrMd3iPius%2FZKMHrwCUpKzZJXamIQebM1%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4LROE%2FbtrMdN8n6DK%2FaJPaem0STBXolYbB0Lt1Xk%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdzXXJD%2FbtrMdRCP3HD%2F2dwDG7NIh9JQBkJmankGSK%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbjG1ub%2FbtrNKWcsYNd%2FKJd5mPKSFsm5kJeBHK1QAk%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb2ltrB%2FbtrNIKwzIuJ%2FVcbMKeYugq7cAENQzUOIkK%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3H6ab%2FbtrNNoMN8sQ%2FSEMf6f4cysz3aKOqdZNrG1%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlmYWc%2FbtrNNZZ6zNa%2FplZARsmpyK3ALSkKvlCC7K%2Fimg.jpg"
];

const randNum = Math.floor(Math.random() * bgList.length);

bg.style.backgroundImage = `url(${bgList[randNum]})`;