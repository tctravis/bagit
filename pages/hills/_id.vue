<template>
  <div>
    <BasePageTitle
      ><template v-slot:title>{{ hill.name }}</template>
      <template v-slot:icon>
        <AreaIcon
          :area="hill.area"
          :class="
            ('bg-' + hill.areaName) | removeSpaces | lowercase
          " /></template
    ></BasePageTitle>

    <div class="mb-4 p-4 bg-lightgrey rounded">
      <div class="mb-2">
        <span>Wainwright #{{ hill.id }}</span>
      </div>
      <div class="mb-2">
        <HeightRating
          :height-rating="hill.heightRating"
          :area-class-name="hill.areaClassName"
        />
      </div>
      <div class="xsm:flex xsm:flex-row xsm:justify-between mb-2">
        <p>Altitude: {{ hill.height_m }}m</p>
        <p>Prominence: {{ hill.prom_m }}m</p>
      </div>
      <div class="xsm:flex xsm:flex-row xsm:justify-between mb-2">
        <p>OS grid ref: {{ hill.os_grid_ref }}</p>
        <p>OS map #: {{ hill.os_map }}</p>
      </div>
    </div>
    <div class="flex flex-row justify-end">
      <BaseButton
        :button-class="'bg-' + hill.areaClassName"
        fa-icon-class="shoe-prints"
        @click="$refs.modalName.openModal()"
        >Bag it!</BaseButton
      >
    </div>

    <BaseModal ref="modalName">
      <template v-slot:header>
        <h1>Modal title</h1>
      </template>

      <template v-slot:body>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed
          velit dignissim sodales ut eu sem integer vitae. Id aliquet lectus
          proin nibh nisl condimentum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed
          velit dignissim sodales ut eu sem integer vitae. Id aliquet lectus
          proin nibh nisl condimentum. Fringilla urna porttitor rhoncus dolor
          purus. Nam aliquam sem et tortor. Nisl vel pretium lectus quam id.
          Cras pulvinar mattis nunc sed. Quis ipsum suspendisse ultrices gravida
          dictum fusce ut placerat orci. Tristique magna sit amet purus.
          Fermentum et sollicitudin ac orci phasellus egestas tellus. Erat
          pellentesque adipiscing commodo elit at imperdiet dui accumsan. Felis
          eget nunc lobortis mattis aliquam faucibus. Tincidunt eget nullam non
          nisi est sit amet facilisis. Mi in nulla posuere sollicitudin aliquam
          ultrices sagittis orci. Vitae proin sagittis nisl rhoncus mattis
          rhoncus urna neque. Eget nunc scelerisque viverra mauris in aliquam
          sem fringilla ut. Nec nam aliquam sem et tortor consequat id. Commodo
          nulla facilisi nullam vehicula ipsum a. Elementum tempus egestas sed
          sed. Faucibus purus in massa tempor nec feugiat nisl pretium fusce.
        </p>
        <p>
          Arcu cursus vitae congue mauris rhoncus aenean. Tempor id eu nisl nunc
          mi. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Ut
          faucibus pulvinar elementum integer enim. Odio facilisis mauris sit
          amet massa vitae tortor condimentum lacinia. Eu non diam phasellus
          vestibulum lorem sed risus. Porttitor rhoncus dolor purus non enim
          praesent. Sit amet mauris commodo quis imperdiet. Lobortis feugiat
          vivamus at augue eget. Nibh tellus molestie nunc non blandit. Tellus
          mauris a diam maecenas sed enim ut. Tortor aliquam nulla facilisi cras
          fermentum odio eu feugiat pretium. Mattis aliquam faucibus purus in
          massa.
        </p>
      </template>

      <template v-slot:footer>
        <div>
          <button @click="$refs.modalName.closeModal()">Cancel</button>
          <button @click="$refs.modalName.closeModal()">Save</button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import HeightRating from '@/components/HeightRating.vue'
import AreaIcon from '@/components/AreaIcon.vue'

export default {
  components: {
    HeightRating,
    AreaIcon,
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
    }),
    ...mapGetters('hills', ['getHillById']),
    hill() {
      return this.getHillById(this.hillId)
    },
    hillId() {
      return this.$route.params.id
    },
  },
  head() {
    return {
      title: 'Hill #' + this.hill.id,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Details about hill' + this.hill.id,
        },
      ],
    }
  },
}
</script>
