// Необходимо написать функцию-декоратор queryDecorator , которая позволяет выполнять
// сетевой запрос указанное количество раз (если произошла ошибка), через указанный
// промежуток времени.
// Изменять предоставленный код НЕЛЬЗЯ. Вам нужно только реализовать функцию
// queryDecorator .
// Функция принимает следующие аргументы:
// callback (декорируемая функция)
// количество повторов при неудачном запросе
// интервал между повторами

function queryDecorator(func, count, timeout) {
  let currentCount = count;
  const retryFetch = function (arg) {
    try {
      func.call(fetchObject, arg);
    } catch (error) {
      currentCount--;
      sleep(timeout).then(() => {
        if (currentCount) {
          retryFetch(arg);
        }
      });
    }
  };
  return retryFetch;
}

const fetchObject = {
  url: "https://jsonplaceholder.typicode.com/todos",
  getTodoById(id) {
    return fetch(`${this.url}/${id}`)
      .then((response) => response.json())
      .then((json) => console.log(json));
  },
};
fetchObject.getTodoById = queryDecorator(fetchObject.getTodoById, 5, 500);
fetchObject.getTodoById(1);
