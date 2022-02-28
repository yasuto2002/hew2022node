<template>
  <div class="left-column">
    <p class="searchform_head">駅名・エリア名で一発検索</p>
    <form method="get" action="#" class="search_container" @submit="getWord">
      <input
        type="text"
        class="searchform_text-form"
        size="30"
        placeholder="お探しの駅またはエリア名を入力"
        v-model="word"
      />
      <input type="submit" value="検索" :disabled="!meta.valid" />
    </form>

    <form class="search_property">
      <div class="searchform_border">
        <p class="searchform_txt">絞り込み条件</p>
      </div>

      <ul class="select-radio select-radio-inline">
        <li class="select-radio-item">
          <input
            checked
            id="radio-btn1"
            name="line"
            type="radio"
            value="1"
            v-model="data.root"
          />
          <label class="select-radio-label" for="radio-btn1">山手線</label>
        </li>
        <li class="select-radio-item">
          <input
            id="radio-btn2"
            name="line"
            type="radio"
            value="2"
            v-model="data.root"
          />
          <label class="select-radio-label" for="radio-btn2">中央線</label>
        </li>
      </ul>

      <!--
      <div class="line-box">
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">新宿</span></label>
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">池袋</span></label>
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">秋葉原</span></label>
      </div>

      <div class="line-box">
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">新宿</span></label>
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">池袋</span></label>
        <label class="line_CheckboxInput"><input class="line_CheckboxInput-Input" type="checkbox"><span class="line_CheckboxInput-DummyInput"></span><span class="line_CheckboxInput-LabelText">秋葉原</span></label>
      </div>

      -->

      <div class="searchform_border">
        <p class="searchform_txt">賃料</p>
      </div>
      <div class="rent">
        <!-- <select name="rent_low">
        <option value="low">下限なし</option>
        <option value="aa">1000万円~</option>
        <option value="bb">2000万円~</option>
        <option value="cc">3000万円~</option>
        <option value="dd">4000万円~</option>
      </select>
      <select name="Rent_hight">
        <option value="hight">上限なし</option>
        <option value="ee">~1000万円</option>
        <option value="ff">~2000万円</option>
        <option value="gg">~3000万円</option>
        <option value="hh">~4000万円</option>
      </select> -->
        <div class="rent-box">
          <div class="rent_ipselect rent_sl05">
            <select required name="rent_low" v-model="data.lower">
              <option value="null">下限なし</option>
              <option value="1000">1000万円~</option>
              <option value="2000">2000万円~</option>
              <option value="3000">3000万円~</option>
              <option value="4000">4000万円~</option>
            </select>
          </div>
          <div class="rent_ipselect rent_sl05">
            <select required name="Rent_hight" v-model="data.upper">
              <option value="null">上限なし</option>
              <option value="1000">~1000万円</option>
              <option value="2000">~2000万円</option>
              <option value="3000">~3000万円</option>
              <option value="4000">~4000万円</option>
            </select>
          </div>
        </div>
      </div>

      <div class="searchform_border">
        <p class="searchform_txt">間取りタイプ</p>
      </div>
      <div class="searchform_floor">
        <div class="floor-box">
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="1"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">1R</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="2"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">1K</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="3"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">1DK</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="4"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">1LDK</span></label
          >
        </div>
        <div class="floor-box">
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="5"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">2K</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="6"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">2DK</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="7"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">2LDK</span></label
          >
        </div>
        <div class="floor-box">
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="8"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">3K</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="9"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">3DK</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="10"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">3LDK</span></label
          >
        </div>
        <div class="floor-box">
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="11"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">4K</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="12"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">4DK</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor"
              v-model="data.floor_plan"
              value="13"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText">4LDK</span></label
          >
        </div>
        <label class="floor-radio"
          ><input
            class="floor-radio-Input"
            type="radio"
            name="floor"
            v-model="data.floor_plan"
            value="14"
          /><span class="floor-radio-DummyInput"></span
          ><span class="floor-radio-LabelText">5K以上</span></label
        >
      </div>

      <div class="searchform_border">
        <p class="searchform_txt">建物の種類</p>
      </div>
      <div class="searchform_floor">
        <div class="room-box">
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="building_type"
              value="1"
              v-model="data.building_type"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText-a">マンション</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="building_type"
              value="2"
              v-model="data.building_type"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText-a">アパート</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="building_type"
              value="3"
              v-model="data.building_type"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText-a">一戸建て</span></label
          >
        </div>
      </div>

      <div class="searchform_border">
        <p class="searchform_txt">部屋階数</p>
      </div>
      <div class="searchform_floor">
        <div class="sarch-display">
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor_plan"
              value="1"
              v-model="data.room_floor"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText-a">1階</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor_plan"
              value="2"
              v-model="data.room_floor"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText-a">2階</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor_plan"
              value="3"
              v-model="data.room_floor"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText-a">3階</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="floor_plan"
              value="4"
              v-model="data.room_floor"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText-a">それ以上</span></label
          >
        </div>
        <!-- <label><input type="radio" name="floor">1階</label>
      <label><input type="radio" name="floor">2階</label>
      <label><input type="radio" name="floor">3階</label>
      <label><input type="radio" name="floor">それ以上</label> -->
      </div>

      <div class="searchform_border">
        <p class="searchform_txt">構造</p>
      </div>
      <div class="searchform_floor">
        <div class="building-box">
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="construction"
              value="2"
              v-model="data.construction"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText-a">木造</span></label
          >
          <label class="floor-radio"
            ><input
              class="floor-radio-Input"
              type="radio"
              name="construction"
              value="1"
              v-model="data.construction"
            /><span class="floor-radio-DummyInput"></span
            ><span class="floor-radio-LabelText-a">鉄筋</span></label
          >
        </div>
        <label class="floor-radio"
          ><input
            class="floor-radio-Input"
            type="radio"
            name="construction"
            value="3"
            v-model="data.construction"
          /><span class="floor-radio-DummyInput"></span
          ><span class="floor-radio-LabelText-a"
            >ブロック・それ以外</span
          ></label
        >
        <!-- <label><input type="radio" name="floor">木造</label>
      <label><input type="radio" name="floor">鉄筋</label>
      <label><input type="radio" name="floor">鉄骨</label><br>
      <label><input type="radio" name="floor">ブロック・それ以外</label> -->
      </div>

      <div class="searchform_border">
        <p class="searchform_txt">築年数</p>
      </div>

      <div class="rent-box">
        <div class="rent_ipselect rent_sl05">
          <select required name="rent_low" v-model="data.construction_date">
            <option value="null">指定しない</option>
            <option value="-1">1年以内</option>
            <option value="-3">3年以内</option>
            <option value="-5">5年以内</option>
            <option value="-7">7年以内</option>
            <option value="-10">10年以内</option>
            <option value="-15">15年以内</option>
            <option value="-20">20年以内</option>
            <option value="-25">25年以内</option>
          </select>
        </div>
      </div>

      <div class="searchform_border">
        <p class="searchform_txt">駅徒歩</p>
      </div>
      <div class="rent-box">
        <div class="rent_ipselect rent_sl05">
          <select required v-model="data.station_walk">
            <option value="null">指定しない</option>
            <option value="5">5分以内</option>
            <option value="10">10分以内</option>
            <option value="15">15分以内</option>
            <option value="20">15分以上</option>
          </select>
        </div>
      </div>

      <div class="searchform_submit">
        <section>
          <a @click="getConditions()" class="btn_06"
            ><span>この条件で検索</span></a
          >
        </section>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
export default {
  name: "LeftSerch",
  setup(props, context) {
    const data = reactive({
      lower: null,
      upper: null,
      floor_plan: null,
      building_type: null,
      room_floor: null,
      construction: null,
      construction_date: null,
      station_walk: null,
      root: 1,
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const em = store.state.em;
    const schema = yup.object({
      word: yup.string().matches(store.state.regex, em.Matches).required(),
    });
    useForm({
      validationSchema: schema,
    });
    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        word: "",
      },
    });
    const { value: word } = useField("word");
    const getWord = handleSubmit(async (values) => {
      store.state.word = values.word;
      router.push({
        name: "Wsearch-result",
        query: { word: values.word, page: 1 },
      });
    });
    const getConditions = () => {
      router.push({
        name: "Csearch-result",
        query: {
          lower: data.lower,
          upper: data.upper,
          floor_plan: data.floor_plan,
          building_type: data.building_type,
          room_floor: data.room_floor,
          construction: data.construction,
          construction_date: data.construction_date,
          station_walk: data.station_walk,
          page: 1,
          root: data.root,
        },
      });
    };
    return {
      data,
      word,
      getWord,
      meta,
      getConditions,
    };
  },
};
</script>
