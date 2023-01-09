import {ArgumentMetadata, PipeTransform} from "@nestjs/common";

export class LetterTransformPipe implements PipeTransform{
    transform(value: Object, metadata: ArgumentMetadata): any {
       const keys=Object.keys(value)

        for (const key of keys) {
            if(typeof value[key]=='string')
            {
               
              value[key] =value[key].replace(/\u06A9/g, '\u0643'); // ک
               value[key] =value[key].replace(/\u06CC/g, '\u0649'); // ی
               value[key] =value[key].replace(/\u06CC/g, '\u064A'); // ی


            }
        }
        return value
    }
    
}