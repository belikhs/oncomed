// Pagination.js
import React from 'react';
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const visiblePages = 5; // 한 번에 보여줄 페이지 번호의 개수

  // 시작 페이지 번호 계산
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  // 마지막 페이지 번호 계산
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  // 현재 페이지가 처음 몇 페이지에 있을 때 마지막 페이지 조정
  if (currentPage < Math.ceil(visiblePages / 2)) {
    endPage = Math.min(totalPages, visiblePages);
  }

  // 현재 페이지가 마지막 몇 페이지에 있을 때 시작 페이지 조정
  if (currentPage > totalPages - Math.floor(visiblePages / 2)) {
    startPage = Math.max(1, totalPages - visiblePages + 1);
  }

  // 페이지 번호 생성
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        &lt;
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          className={number === currentPage ? 'active' : ''}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
        &gt;
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
