import React, { useEffect, useState } from "react";
import IconButton from "components/common/IconButton";
import theme from "styles/theme";
import * as S from "./style";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  callback: (pageNumber: number) => void;
}

function Pagination({ currentPage, lastPage, callback }: PaginationProps) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (lastPage < 5) {
      const temp = [];
      for (let i = 1; i <= lastPage; i += 1) temp.push(i);
      setPageNumbers(temp);
    } else if (![1, 2, lastPage, lastPage - 1].includes(currentPage)) {
      setPageNumbers([currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]);
    } else if ([1, 2].includes(currentPage)) setPageNumbers([1, 2, 3, 4, 5]);
    else setPageNumbers([lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage]);
  }, [currentPage, lastPage]);

  return (
    <S.Container>
      <IconButton
        size="24px"
        type="button"
        onClick={() => callback(currentPage - 1)}
        disabled={currentPage === 1}
        icon="left"
        fill={theme.colors.grey5}
        style={{ height: "24px" }}
      />
      <S.PageNumberWrapper>
        {pageNumbers.map((number) => (
          <S.PageText key={number} current={currentPage === number} onClick={() => callback(number)}>
            {number}
          </S.PageText>
        ))}
      </S.PageNumberWrapper>
      <IconButton
        size="24px"
        type="button"
        onClick={() => callback(currentPage + 1)}
        disabled={currentPage === lastPage}
        icon="right"
        fill={theme.colors.grey5}
        style={{ height: "24px" }}
      />
    </S.Container>
  );
}

export default Pagination;
