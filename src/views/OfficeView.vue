<template>
  <div class="offices">
    <div class="mb-4">
      <h2>Office</h2>
      <div class="is-flex is-justify-content-end">
        <b-button @click="updateOffice()" class="is-success">ອັບເດດ</b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-quarter">
        <img :src="previewPhoto" :alt="form.nameEng" />
      </div>
      <div class="column">
        <form>
          <!-- name -->
          <div class="columns mb-0">
            <div class="column">
              <div class="form-group">
                <label for="">ຊຶ່ຫຍໍ້</label>
                <b-input placeholder="ຊຶ່ຫຍໍ້" v-model="form.nameSh"></b-input>
              </div>
            </div>
            <div class="column">
              <div class="form-group">
                <label for="">ຊຶ່ລາວ</label>
                <b-input placeholder="ຊຶ່ລາວ" v-model="form.nameLao"></b-input>
              </div>
            </div>
            <div class="column">
              <div class="form-group">
                <label for="">ຊື່ອັງກິດ</label>
                <b-input
                  placeholder="ຊຶ່ອັງກິດ"
                  v-model="form.nameEng"
                ></b-input>
              </div>
            </div>
          </div>
          <!-- address -->
          <div class="columns mb-0">
            <div class="column">
              <div class="form-group">
                <label for="">ແຂວງ</label>
                <b-select
                  :expanded="true"
                  placeholder="ເລືອກແຂວງ"
                  v-model="form.province"
                  @input="changeProvine($event)"
                >
                  <option
                    v-for="province in provinces"
                    :value="province.id"
                    :key="province.id"
                  >
                    {{ province.name }}
                  </option>
                </b-select>
              </div>
            </div>
            <div class="column">
              <div class="form-group">
                <label for="">ເມືອງ</label>
                <b-select
                  :expanded="true"
                  placeholder="ເລືອກເມືອງ"
                  v-model="form.district"
                >
                  <option
                    v-for="district in districts"
                    :value="district.id"
                    :key="district.id"
                  >
                    {{ district.name }}
                  </option>
                </b-select>
              </div>
            </div>
            <div class="column">
              <div class="form-group">
                <label for="">ບ້ານ</label>
                <b-input placeholder="ບ້ານ" v-model="form.village"></b-input>
              </div>
            </div>
          </div>
          <!-- email -->
          <div class="columns mb-0">
            <div class="column">
              <div class="form-group">
                <label for="">ອີເມວ</label>
                <b-input placeholder="ອີເມວ" v-model="form.email"></b-input>
              </div>
            </div>
          </div>
          <!-- phone, direct, fax -->
          <div class="columns mb-0">
            <div class="column">
              <div class="form-group">
                <label for="">ເບີໂທ</label>
                <b-input placeholder="ເບີໂທ" v-model="form.phone"></b-input>
              </div>
            </div>
            <div class="column">
              <div class="form-group">
                <label for="">ເບີໂທດ່ວນ</label>
                <b-input
                  placeholder="ເບີໂທດ່ວນ"
                  v-model="form.direct"
                ></b-input>
              </div>
            </div>
            <div class="column">
              <div class="form-group">
                <label for="">ແຟັກ</label>
                <b-input placeholder="ແຟັກ" v-model="form.fax"></b-input>
              </div>
            </div>
          </div>
          <!-- website -->
          <div class="columns mb-0">
            <div class="column">
              <div class="form-group">
                <label for="">ເວັບໄຊ</label>
                <b-input placeholder="ເວັບໄຊ" v-model="form.website"></b-input>
              </div>
            </div>
          </div>
          <!-- adress -->
          <div class="columns mb-0">
            <div class="column">
              <div class="form-group">
                <label for="">ທີ່ຢຸ່</label>
                <b-input
                  type="textarea"
                  maxlength="200"
                  placeholder="ທີ່ຢຸ່"
                  v-model="form.address"
                ></b-input>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getOffice, updateOffice } from "../services/officeService";
import store from "../store";
// import { basePhoto } from "@/utils/environment";
export default {
  data() {
    return {
      id: "",
      previewPhoto: "",
      form: {
        nameSh: "",
        nameEng: "",
        nameLao: "",
        address: "",
        province: "",
        district: "",
        village: "",
        email: "",
        website: "",
        logo: "",
        phone: "",
        direct: "",
        fax: "",
      },
    };
  },
  computed: {
    provinces() {
      return store.getters["provinces"];
    },

    districts() {
      return store.getters["districts"];
    },
  },
  created() {
    this.initializeForm();
    this.loadProvince();
  },

  methods: {
    async initializeForm() {
      await getOffice().then((res) => {
        const data = res.office;
        this.id = data.id;
        this.form.nameSh = data.nameShort;
        this.form.nameLao = data.nameLao;
        this.form.nameEng = data.nameEng;
        this.form.address = data.address;
        this.form.email = data.email;
        this.form.fax = data.fax;
        this.form.phone = data.phone;
        this.form.website = data.website;
        this.form.direct = data.directPhone;
        this.form.province = data.provinceId;
        this.form.district = data.districtId;
        this.form.village = data.village;
        if (data.logo) {
          this.previewPhoto = data.logo;
        }

        this.changeProvine(data.provinceId);
      });
    },

    loadProvince() {
      store.dispatch("getProvinceAll");
    },

    changeProvine(value) {
      store.dispatch("getDistrictAll", value);
    },

    updateOffice() {
      const f = {
        officeId: this.id,
        nameShort: this.form.nameSh,
        nameLao: this.form.nameLao,
        nameEng: this.form.nameEng,
        address: this.form.address,
        provinceId: this.form.province,
        districtId: this.form.district,
        village: this.form.village,
        phone: this.form.phone,
        directPhone: this.form.direct,
        fax: this.form.fax,
        email: this.form.email,
        website: this.form.website,
        logo: this.form.logo,
      };

      updateOffice(f).then(() => {});
    },
  },
};
</script>

<style scoped>
.offices img {
  width: 100%;
  height: 200px;
  object-fit: scale-down;
}
</style>
