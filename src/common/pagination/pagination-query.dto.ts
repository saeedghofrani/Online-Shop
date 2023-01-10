import { ApiProperty } from "@nestjs/swagger";
import { PaginateQuery } from "nestjs-paginate";

export class PaginationQueryDto implements PaginateQuery{
    @ApiProperty()
    page?: number;

    @ApiProperty()
    limit?: number;

    @ApiProperty({example:[ ["Column Name","DESC"]  ]})
    sortBy?: [string, string][];
    
    @ApiProperty({example:["Column Name 1 ","Column Name 2"]})
    searchBy?: string[];
    
    @ApiProperty({example:"Value"})
    search?: string;
    
    @ApiProperty({example: {"Column Name":"$ilike:Value"}})
    filter?: { [column: string]: string | string[]; };
    
    @ApiProperty()
    path: string= 'Nobody Knows...!';

}