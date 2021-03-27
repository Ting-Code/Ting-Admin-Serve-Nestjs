import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MaterialEntity } from "@libs/db/models/materials/material/material.entity";
import { MaterialDto } from "@libs/db/models/materials/material/material.dto";
import { MatTestEntity } from "@libs/db/models/materials/material/mat-test.entity";
import { ImageEntity } from "@libs/db/models/materials/material/image.entity";

@Injectable()
export class MaterialService {

  constructor(
    //引入数据库表示例赋值给articleRepository
    @InjectRepository(MaterialEntity)
    private readonly Repository: Repository<MaterialEntity>,

    @InjectRepository(MatTestEntity)
    private readonly testRepository: Repository<MatTestEntity>,

    @InjectRepository(ImageEntity)
    private readonly imgRepository: Repository<ImageEntity>,

  ) {}

  async addMat(body){
    let { mat, imgList, testList} = body
    try {
      let result = await this.add( mat );
      if (result.id && imgList && imgList instanceof Array) {
        for (let i=0; i<imgList.length; i++) {
          await this.addImg({
            mat_id: result.id,
            img_url: imgList[i]
          })
        }
      }
      //3、增加商品属性
      if (result.id && testList && testList instanceof Array) {
        for (let i = 0; i < testList.length; i++) {
          //获取当前 商品类型id对应的商品类型属性
          await this.addTest({
            mat_id: result.id,
            test: testList[i].test,
            requ: testList[i].requ,
            result: testList[i].result,
            is_pass: testList[i].is_pass
          })
        }
      }
      return true
    }catch (error){
      throw new BadRequestException({code:400,msg:"添加物料错误"})
    }
  }


  //如查找数据
  async find(json:any = {}){
    try {
      return await this.Repository.find(json);
    }catch (err){
      return err;
    }
  }

  async add(json: MaterialDto){
    try {
      return  await this.Repository.save(json);
    } catch (error) {
      return null;
    }
  }

  async update(id:number, body:{ mat:MaterialDto, testList:Array<object>|null }){
    try {
    const {mat, testList} = body
    await this.Repository.update({id:id}, mat);
    await this.deleteTest({mat_id: id})
    testList.map(async (v:any) => {
      await this.addTest({
        mat_id: id,
        test: v.test,
        requ: v.requ,
        result: v.result,
        is_pass: v.is_pass
      })
    })
      return true
    } catch (error) {
      return null;
    }
  }

  async delete(json:MaterialDto){
    try {
      return await this.Repository.delete(json);
    } catch (error) {
      return null;
    }
  }

  async getModel() {
    return this.Repository;
  }


  //如查找数据
  async findTest(json:any = {}){
    try {
      return await this.testRepository.find(json);
    }catch (err){
      return err;
    }
  }

  async addTest(json: any){
    try {
      await this.testRepository.save(json)
      return [];
    } catch (error) {
      return null;
    }
  }


  async deleteTest(json: any){
    try {
      return await this.testRepository.delete(json);
    } catch (error) {
      return null;
    }
  }

  //如查找数据
  async findImg(json:any = {}){
    try {
      return await this.imgRepository.find(json);
    }catch (err){
      return err;
    }
  }

  async addImg(json: any){
    try {
      await this.imgRepository.save(json);
      return [];
    } catch (error) {
      return null;
    }
  }

  async updateImg(json1:any,json2:any){
    try {
      return  await this.imgRepository.update(json1,json2);

    } catch (error) {
      return null;
    }
  }

  async deleteImg(json:any){
    try {
      return await this.imgRepository.delete(json);
    } catch (error) {
      return null;
    }
  }

}
