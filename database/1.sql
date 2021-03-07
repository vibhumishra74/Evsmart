PGDMP     "                    y            evsmart    12.6    13.2     m           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            n           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            o           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            p           1262    16396    evsmart    DATABASE     \   CREATE DATABASE evsmart WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE evsmart;
                doadmin    false                        3079    16399 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            q           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1255    16444    trigger_set_timestamp_cs()    FUNCTION     �   CREATE FUNCTION public.trigger_set_timestamp_cs() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.cs_updated_at = NOW();
  RETURN NEW;
END;
$$;
 1   DROP FUNCTION public.trigger_set_timestamp_cs();
       public          doadmin    false            �            1255    16424    trigger_set_timestamp_users()    FUNCTION     �   CREATE FUNCTION public.trigger_set_timestamp_users() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.user_updated_at = NOW();
  RETURN NEW;
END;
$$;
 4   DROP FUNCTION public.trigger_set_timestamp_users();
       public          doadmin    false            �            1259    16482    charging_station    TABLE     �  CREATE TABLE public.charging_station (
    cs_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cs_phone bigint NOT NULL,
    cs_openat time without time zone DEFAULT '00:00:00'::time without time zone NOT NULL,
    cs_closeat time without time zone DEFAULT '23:59:59'::time without time zone NOT NULL,
    cs_longitude numeric(12,9) NOT NULL,
    cs_latitude numeric(12,9) NOT NULL,
    cs_cost numeric(9,2) NOT NULL,
    cs_verification boolean DEFAULT false NOT NULL,
    cs_created_at timestamp with time zone DEFAULT now() NOT NULL,
    cs_updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL
);
 $   DROP TABLE public.charging_station;
       public         heap    doadmin    false    2            �            1259    16446    users    TABLE     r  CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_firstname character varying(245) NOT NULL,
    user_lastname character varying(245) NOT NULL,
    user_phone bigint NOT NULL,
    user_email character varying(245) NOT NULL,
    user_password character varying(64) NOT NULL,
    user_verification boolean DEFAULT false NOT NULL,
    user_role character(255) DEFAULT 'Normal'::bpchar NOT NULL,
    cs_status boolean DEFAULT false NOT NULL,
    user_created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.users;
       public         heap    doadmin    false    2            j          0    16482    charging_station 
   TABLE DATA           �   COPY public.charging_station (cs_id, cs_phone, cs_openat, cs_closeat, cs_longitude, cs_latitude, cs_cost, cs_verification, cs_created_at, cs_updated_at, user_id) FROM stdin;
    public          doadmin    false    204   �       i          0    16446    users 
   TABLE DATA           �   COPY public.users (user_id, user_firstname, user_lastname, user_phone, user_email, user_password, user_verification, user_role, cs_status, user_created_at, user_updated_at) FROM stdin;
    public          doadmin    false    203   D       �           2606    16496 1   charging_station charging_station_cs_latitude_key 
   CONSTRAINT     s   ALTER TABLE ONLY public.charging_station
    ADD CONSTRAINT charging_station_cs_latitude_key UNIQUE (cs_latitude);
 [   ALTER TABLE ONLY public.charging_station DROP CONSTRAINT charging_station_cs_latitude_key;
       public            doadmin    false    204            �           2606    16494 2   charging_station charging_station_cs_longitude_key 
   CONSTRAINT     u   ALTER TABLE ONLY public.charging_station
    ADD CONSTRAINT charging_station_cs_longitude_key UNIQUE (cs_longitude);
 \   ALTER TABLE ONLY public.charging_station DROP CONSTRAINT charging_station_cs_longitude_key;
       public            doadmin    false    204            �           2606    16492 &   charging_station charging_station_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.charging_station
    ADD CONSTRAINT charging_station_pkey PRIMARY KEY (cs_id);
 P   ALTER TABLE ONLY public.charging_station DROP CONSTRAINT charging_station_pkey;
       public            doadmin    false    204            �           2606    16498 -   charging_station charging_station_user_id_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.charging_station
    ADD CONSTRAINT charging_station_user_id_key UNIQUE (user_id);
 W   ALTER TABLE ONLY public.charging_station DROP CONSTRAINT charging_station_user_id_key;
       public            doadmin    false    204            �           2606    16459    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            doadmin    false    203            �           2606    16463    users users_user_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_email_key;
       public            doadmin    false    203            �           2606    16461    users users_user_phone_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_phone_key UNIQUE (user_phone);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_phone_key;
       public            doadmin    false    203            �           2606    16499 .   charging_station charging_station_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.charging_station
    ADD CONSTRAINT charging_station_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 X   ALTER TABLE ONLY public.charging_station DROP CONSTRAINT charging_station_user_id_fkey;
       public          doadmin    false    204    3805    203            j   �  x���Kn1D�ӧ�>`��G$�,��{�#��8���؀�P�[�U�{7��L��W�(�y-b��F�r+x�Ǻ�n@�4���8E�D1�#�Zo�FH�˯�@r';���~������U4P�=��
�Am�%|�EqTg�}9lΏ�L�Yv)%���/�(~Űg*Z�)�[��Mݭ���ݱ�5w���d?|��bo���4��B�kݺ\��a�]#�����������Ţ|�q���o�猻>�:
9��v�ޱI���|˄�!y�Q��7��+'V��/�E�9�B��yM�$-\�B�EՆ.��9����t�����q��܎�:K����LBo�@�֪�+j��B�S��w����q)zf�2���Ȭ��k�L�l�&c��8�p�Ӈ      i     x���r�������ݍ9����0������������ntD�4
��hA����c^k E�
�������x�̭�J�sI�=�
��`���O�¿��~[Fv��!L(�9�kov+���o=��# 	���E��XDDpF� �g5���C�P�c���TIgb�n��s�ru��BT	���|�	"��@"� 5� CT3����q�
���92d0*R! ɢ�R�L@�V �J�څSK�i�4�`#��
R�ХeN�O,߱����dX��<����'g5�:=K�tZ$�4�U��C��fXZדv��a^�ĸHH��RF�̬�g��08
��*1ZHc�2g�u�6Lx	��egz\�s���6��J�s���q������[��D?�+�������G�6r�;�kZ�eD!��zff�e;c%�1�ahR�
�f���!��57Y*��嗁�����o:f��1�O[�t�O�~i��E�f�^�M��)�{?�ߝ��&�E�"EQ�X^:����*�3�\�	��HD�!�:C�$���W���n2�Lwz��w����)錤o;�x�g|S��(e�ec���2����O��zL!� ��YYc^�y�%��xg	�6�SƱ!S�Ӕj�ʀ�|�$B� Wm�(J����Mp[�V�Z����a{)z�8<8�I��O��n�>�=y��.�9C1�k�5o�(�x.BY�-�Jp[�)�&�Owz�����	"�@����o?� F`v�ư����hVo��||X�FD��c1�<��+,��.9�q���k��]��i^MX^$�s�J�!��6��v��	�+uͤL��)���H��|��f�w�C<w�%�>�#�g��W����v~{�_5�>�.<`�vƣt�(�6��֬ �~P;��wT+Y�^��$��	�!�fS�R�C��H �a@�
.�!A9f���H����_'��5҆OSҳfX��U6�iKZ6f�ך��e⽍L���I�u�`��������2B�I"t�饚�Q�� (��8�C�*�MXz�)FP9��t:.,�Ǽ6�a�x�B�ɶ��Nj�ѷ�G���[��y�p��&)�˸{��7��"B��u�饚�.�,���]�P��`�8��(��*��h���+��z9[��R�����h���J/Y�~<�Ź��)���w}o+7�
,RA�7�ʥ�ט+��R9I��I�r�q�����E�\f)&Y�*�.�Z�sE��tS7����6N�*����T˛��,t�Vj�h��jj��Ha�nd饘�B��qZ�U@rm�����������)�Y�ϵ��l���n'^��S�Q;w����0=��lW���*m�(,V��K�����SF"����&ԯj���l�TC�Ji�p�4�.
��S�"��j�/�a�3l�]�49;]{�H�q3҃B�uzQk����]����?Z�Nz�*��D*쫷grZ?w#k9�^�UIC/	5Pkz�S��k�7�,M�\�#Z�=-Os���M_H�/�����?F����:d%,ƣ3m��0di␔8��[9z�汎U� P�8�(��;�~ƪ7�aK�rǷ�I÷���7]����m?���+��c�h=ХG���;o�=�tP�T`�Wf�Z�DƟ�~/�5�Ă�עk��H�g9	��\�̨y#+���(ؓj��@ks�%���ڙ[�d�\J��]eq�g�>=Lj}�Η�)�G���^6��Cs�۲meP蟞J͝.������8��$����)�W�b��Q>��2Ia     