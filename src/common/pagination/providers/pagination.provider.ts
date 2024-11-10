import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async paginate<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    const results = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    const baseUrl = `${this.request.protocol}://${this.request.headers.host}/`;
    const newUrl = new URL(this.request.url, baseUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);

    const nextPage =
      paginationQuery.page === totalPages ? null : paginationQuery.page + 1;

    const previousPage =
      paginationQuery.page === 1 ? null : paginationQuery.page - 1;

    const path = `${newUrl.origin}${newUrl.pathname}`;

    const finalResponse = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: paginationQuery.page,
      },
      links: {
        first: `${path}?limit=${paginationQuery.limit}`,
        last: `${path}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${path}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: nextPage
          ? `${path}?limit=${paginationQuery.limit}&page=${nextPage}`
          : null,
        previous: previousPage
          ? `${path}?limit=${paginationQuery.limit}&page=${previousPage}`
          : null,
      },
    };

    return finalResponse;
  }
}
